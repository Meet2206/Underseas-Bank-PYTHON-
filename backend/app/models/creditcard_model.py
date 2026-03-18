from sqlalchemy import Column, Integer, Float, String, DateTime, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

from app.database import Base


class CreditCard(Base):

    __tablename__ = "credit_cards"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer, ForeignKey("users.id"))
    account_id = Column(Integer, ForeignKey("accounts.id"))

    card_number = Column(String, unique=True, index=True)

    credit_limit = Column(Float, default=50000)

    used_credit = Column(Float, default=0)

    available_credit = Column(Float, default=50000)

    status = Column(String, default="active")

    created_at = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship("User")