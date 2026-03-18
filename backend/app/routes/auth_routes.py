from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.auth_schema import RegisterRequest, LoginRequest, AuthResponse
from app.services.auth_service import register_user, login_user
from app.middleware.auth_middleware import get_current_user


router = APIRouter(prefix="/auth", tags=["Auth"])


@router.post("/register", response_model=AuthResponse)
def register(data: RegisterRequest, db: Session = Depends(get_db)):

    result = register_user(data, db)

    return result


@router.post("/login", response_model=AuthResponse)
def login(data: LoginRequest, db: Session = Depends(get_db)):
    """
    Login using phone number and MPIN.
    Locks account after 5 failed attempts.
    """

    return login_user(data, db)


@router.get("/me")
def get_me(current_user=Depends(get_current_user)):
    """
    Get details of currently authenticated user.
    """

    return {
        "id": current_user.id,
        "name": current_user.name,
        "email": current_user.email,
        "phone_number": current_user.phone_number,
    }

@router.post("/send-verification")
def send_verification(data: dict):

    otp = "123456"

    from app.tasks.email_tasks import send_email_verification

    send_email_verification.delay(data["email"], otp)

    return {"message": "OTP sent"}    


@router.post("/verify-email")
def verify_email(data: dict):

    if data["otp"] != "123456":
        raise Exception("Invalid OTP")

    return {"message": "Email verified"}