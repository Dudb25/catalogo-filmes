from sqlalchemy import Column, Integer, String, Float
from backend.database import Base
from pydantic import BaseModel

class Filme(Base):
    __tablename__ = "filmes"
    
    id = Column(Integer, primary_key=True, index=True)
    titulo = Column(String, nullable=False)
    genero = Column(String, nullable=True)
    ano = Column(Integer, nullable=True)
    descricao = Column(String, nullable=True)
    status = Column(String, nullable=True)
    nota = Column(Float, nullable=True)

    class Usuario(Base):
        __tablename__ = "usuarios"

        id = Column(Integer, primary_key=True, index=True)
        nome = Column(String(100), nullable=False)
        email = Column(String(100), unique=True, nullable=False)
        senha = Column(String(200), nullable=False)
