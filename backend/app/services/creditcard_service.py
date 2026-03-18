import random
from sqlalchemy.orm import Session

from app.models.creditcard_model import CreditCard


def generate_card_number():

    return str(random.randint(4000000000000000, 4999999999999999))


def apply_credit_card(data, user_id: int, db: Session):

    card = CreditCard(
        user_id=user_id,
        account_id=data.account_id,
        card_number=generate_card_number(),
        credit_limit=data.credit_limit,
        available_credit=data.credit_limit
    )

    db.add(card)
    db.commit()
    db.refresh(card)

    return card


def get_user_cards(user_id: int, db: Session):

    return db.query(CreditCard).filter(
        CreditCard.user_id == user_id
    ).all()


def make_purchase(card_id: int, amount: float, db: Session):

    card = db.query(CreditCard).filter(
        CreditCard.id == card_id
    ).first()

    if not card:
        raise Exception("Card not found")

    if card.available_credit < amount:
        raise Exception("Credit limit exceeded")

    card.used_credit += amount
    card.available_credit -= amount

    db.commit()
    db.refresh(card)

    return card


def pay_bill(card_id: int, amount: float, db: Session):

    card = db.query(CreditCard).filter(
        CreditCard.id == card_id
    ).first()

    if not card:
        raise Exception("Card not found")

    card.used_credit -= amount
    card.available_credit += amount

    if card.used_credit < 0:
        card.used_credit = 0

    db.commit()
    db.refresh(card)

    return card