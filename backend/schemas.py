from pydantic import BaseModel

class FilmeBase(BaseModel):
    id: int | None = None
    titulo: str
    genero: str | None = None
    ano: int | None = None
    status: str | None = None
    nota: float | None = None

class FilmeCreate(FilmeBase):
    pass

class FilmeResponse(FilmeBase):
    id: int

    class Config:
        from_attributes = True


class UsuarioBase(BaseModel):
    nome: str
    email: str

class UsuarioCreate(UsuarioBase):
    senha: str

class UsuarioResponse(UsuarioBase):
    id: int

    class Config:
        from_attributes = True