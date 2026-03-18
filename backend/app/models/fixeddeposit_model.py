from sqlalchemy import Column, Integer, Float, String, DateTime, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

from app.database import Base


class FixedDeposit(Base):

    __tablename__ = "fixed_deposits"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer, ForeignKey("users.id"))
    account_id = Column(Integer, ForeignKey("accounts.id"))

    principal_amount = Column(Float, nullable=False)
    interest_rate = Column(Float, nullable=False)

    duration_months = Column(Integer, nullable=False)

    maturity_amount = Column(Float)

    status = Column(String, default="active")

    created_at = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship("User")