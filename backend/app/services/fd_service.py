from sqlalchemy.orm import Session

from app.models.fixeddeposit_model import FixedDeposit


def calculate_maturity(principal, rate, months):

    years = months / 12

    maturity = principal * (1 + (rate / 100) * years)

    return round(maturity, 2)


def create_fd(data, user_id: int, db: Session):

    maturity = calculate_maturity(
        data.principal_amount,
        data.interest_rate,
        data.duration_months
    )

    fd = FixedDeposit(
        user_id=user_id,
        account_id=data.account_id,
        principal_amount=data.principal_amount,
        interest_rate=data.interest_rate,
        duration_months=data.duration_months,
        maturity_amount=maturity
    )

    db.add(fd)
    db.commit()
    db.refresh(fd)

    return fd


def get_user_fds(user_id: int, db: Session):

    return db.query(FixedDeposit).filter(
        FixedDeposit.user_id == user_id
    ).all()


def close_fd(fd_id: int, db: Session):

    fd = db.query(FixedDeposit).filter(
        FixedDeposit.id == fd_id
    ).first()

    if not fd:
        raise Exception("FD not found")

    fd.status = "closed"

    db.commit()
    db.refresh(fd)

    return fd