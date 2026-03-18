from pydantic import BaseModel


class CreditCardApplyRequest(BaseModel):

    account_id: int
    credit_limit: float


class CreditPurchaseRequest(BaseModel):

    card_id: int
    amount: float


class CreditPaymentRequest(BaseModel):

    card_id: int
    amount: float


class CreditCardResponse(BaseModel):

    id: int
    card_number: str
    credit_limit: float
    used_credit: float
    available_credit: float
    status: str

    class Config:
        from_attributes = True