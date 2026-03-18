from sqlalchemy import Column, Integer, Float, String, DateTime, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

from app.database import Base


class Loan(Base):
    __tablename__ = "loans"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer, ForeignKey("users.id"))
    account_id = Column(Integer, ForeignKey("accounts.id"))

    loan_amount = Column(Float, nullable=False)
    interest_rate = Column(Float, nullable=False)
    tenure_months = Column(Integer, nullable=False)

    emi_amount = Column(Float, nullable=False)

    status = Column(String, default="active")

    remaining_balance = Column(Float)

    created_at = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship("User")
    account = relationship("Account")