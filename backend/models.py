from sqlalchemy import Column, Integer, String, Float
from backend.database import Base
from pydantic import BaseModel

class Filme(Base):
    __tablename__ = "filmes"
    
    id = Column(Integer, primary_key=True, index=True)
    titulo = Column(String, nullable=False)
    genero = Column(String, nullable=True)
    ano = Column(Integer, nullable=True)
    status = Column(String, nullable=True)
    nota = Column(Float, nullable=True)