from pydantic import BaseModel


class LoanApplyRequest(BaseModel):

    account_id: int
    loan_amount: float
    interest_rate: float
    tenure_months: int


class LoanPaymentRequest(BaseModel):

    loan_id: int
    amount: float


class LoanResponse(BaseModel):

    id: int
    loan_amount: float
    interest_rate: float
    tenure_months: int
    emi_amount: float
    remaining_balance: float
    status: str

    class Config:
        from_attributes = True