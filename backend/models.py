from sqlalchemy import Column, Integer, String, Float, ForeignKey
from backend.database import Base
from sqlalchemy.orm import relationship

class Filme(Base):
    __tablename__ = "filmes"
    
    id = Column(Integer, primary_key=True, index=True)
    titulo = Column(String, nullable=False)
    genero = Column(String, nullable=True)
    nota = Column(Float, nullable=True)
    status = Column(String, nullable=True)

    usuarios = relationship(
        "UsuarioFilme",
        back_populates="filme"
    )

class Usuario(Base):
    __tablename__ = "usuarios"

    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String(100), nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    senha = Column(String(200), nullable=False)

    filmes = relationship(
        "UsuarioFilme",
        back_populates="usuario",
        cascade="all, delete-orphan"
    )

class UsuarioFilme(Base):
    __tablename__ = "usuario_filmes"

    id = Column(Integer, primary_key=True, index=True)

    usuario_id = Column(
        Integer,
        ForeignKey("usuarios.id"),
        nullable=False
    )

    filme_id = Column(
        Integer,
        ForeignKey("filmes.id"),
        nullable=False
    )

    status = Column(String, nullable=True)

    nota = Column(Float, nullable=True)

    usuario = relationship(
        "Usuario",
        back_populates="filmes"
    )

    filme = relationship(
        "Filme",
        back_populates="usuarios"
    )