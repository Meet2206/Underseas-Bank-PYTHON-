from pydantic import BaseModel, EmailStr, constr


MPIN = constr(pattern=r"^\d{4}$")
PHONE = constr(pattern=r"^\d{10}$")


class RegisterRequest(BaseModel):
    name: str
    email: EmailStr
    phone_number: PHONE
    mpin: MPIN


class LoginRequest(BaseModel):
    phone_number: PHONE
    mpin: MPIN


class AuthResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"