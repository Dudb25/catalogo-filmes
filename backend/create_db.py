from backend.database import Base, engine
from backend import models

Base.metadata.create_all(bind=engine)

print("Banco de dados criado com sucesso!")