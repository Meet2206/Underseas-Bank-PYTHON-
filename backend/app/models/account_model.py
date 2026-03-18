from sqlalchemy import Column, Integer, Float, String, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base


class Account(Base):

    __tablename__ = "accounts"

    id = Column(Integer, primary_key=True, index=True)

    account_number = Column(String, unique=True, index=True)

    account_type = Column(String)   # ← ADD THIS

    user_id = Column(Integer, ForeignKey("users.id"))

    balance = Column(Float, default=0)

    user = relationship("User")