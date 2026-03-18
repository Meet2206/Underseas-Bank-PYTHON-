from pydantic import BaseModel


class CreateAccountRequest(BaseModel):
    account_type: str


class AccountResponse(BaseModel):
    id: int
    account_number: str
    account_type: str
    balance: float