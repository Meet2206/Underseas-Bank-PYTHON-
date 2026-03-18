from pydantic import BaseModel


class FDCreateRequest(BaseModel):

    account_id: int
    principal_amount: float
    interest_rate: float
    duration_months: int


class FDResponse(BaseModel):

    id: int
    principal_amount: float
    interest_rate: float
    duration_months: int
    maturity_amount: float
    status: str

    class Config:
        from_attributes = True