from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

from app.database import Base


class Beneficiary(Base):

    __tablename__ = "beneficiaries"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer, ForeignKey("users.id"))

    name = Column(String)
    account_number = Column(String)

    bank_name = Column(String)

    user = relationship("User")