from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from backend.database import SessionLocal
from backend import models, schemas

router = APIRouter(prefix="/filmes", tags=["Filmes"])
