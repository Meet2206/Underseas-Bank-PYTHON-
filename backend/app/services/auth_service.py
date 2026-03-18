from fastapi import HTTPException
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError

from app.models.user_model import User
from app.utils.password_hash import hash_password, verify_password
from app.utils.jwt_handler import create_access_token


def register_user(data, db: Session):

    existing_user = db.query(User).filter(
        (User.email == data.email) | (User.phone_number == data.phone_number)
    ).first()

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="User already exists with this email or phone number"
        )

    mpin_hash = hash_password(data.mpin)

    user = User(
        name=data.name,
        email=data.email,
        phone_number=data.phone_number,
        mpin_hash=mpin_hash
    )

    db.add(user)

    try:
        db.commit()
    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=400,
            detail="User already exists with this email or phone number"
        )

    db.refresh(user)

    token = create_access_token({"user_id": user.id})

    return {
        "access_token": token,
        "token_type": "bearer"
    }


def login_user(data, db: Session):

    user = db.query(User).filter(
        User.phone_number == data.phone_number
    ).first()

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    if user.is_locked:
        raise HTTPException(
            status_code=403,
            detail="Account locked due to multiple failed login attempts."
        )

    if not verify_password(data.mpin, user.mpin_hash):

        user.failed_attempts += 1

        if user.failed_attempts >= 5:
            user.is_locked = True

        db.commit()

        raise HTTPException(
            status_code=401,
            detail="Invalid MPIN"
        )

    user.failed_attempts = 0
    db.commit()

    token = create_access_token({"user_id": user.id})

    return {
        "access_token": token,
        "token_type": "bearer"
    }