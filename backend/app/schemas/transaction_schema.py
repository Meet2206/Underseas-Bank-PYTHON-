from pydantic import BaseModel


class DepositRequest(BaseModel):
    account_id: int
    amount: float


class WithdrawRequest(BaseModel):
    account_id: int
    amount: float


class TransferRequest(BaseModel):
    from_account_id: int
    to_account_id: int
    amount: float