from pydantic import BaseModel

class FilmeBase(BaseModel):
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