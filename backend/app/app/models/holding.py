from typing import TYPE_CHECKING

from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from app.db.base_class import Base

if TYPE_CHECKING:
    from .user import User  # noqa: F401


class Holding(Base):
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    ticker = Column(String, index=True)
    value = Column(Integer)
    owner_id = Column(Integer, ForeignKey("user.id"))
    owner = relationship("User", back_populates="holdings")
