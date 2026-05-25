from sqlalchemy import Column, Integer, String
from database import Base
from pydantic import BaseModel

class Filme(Base):
    __tablename__ = "filmes"
    
    id = Column(Integer, primary_key=True, index=True)
    titulo = Column(String, nullable=False)
    genero = Column(String, nullable=True)
    ano = Column(Integer, nullable=True)
    descricao = Column(String, nullable=True)