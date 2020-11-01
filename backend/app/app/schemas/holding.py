from typing import Optional

from pydantic import BaseModel


# Shared properties
class HoldingBase(BaseModel):
    name: Optional[str] = None
    ticker: Optional[str] = None
    value: Optional[int] = None


# Properties to receive on Holding creation
class HoldingCreate(HoldingBase):
    name: str
    ticker: str
    value: int


# Properties to receive on Holding update
class HoldingUpdate(HoldingBase):
    pass


# Properties shared by models stored in DB
class HoldingInDBBase(HoldingBase):
    id: int
    name: str
    ticker: str
    value: int
    owner_id: int

    class Config:
        orm_mode = True


# Properties to return to client
class Holding(HoldingInDBBase):
    pass


# Properties properties stored in DB
class HoldingInDB(HoldingInDBBase):
    pass
