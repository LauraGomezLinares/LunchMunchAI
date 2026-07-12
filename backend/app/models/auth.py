from pydantic import BaseModel, EmailStr
from typing import Optional

class UserLogin(BaseModel):
    email: str
    password: str
