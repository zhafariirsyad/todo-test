from fastapi import FastAPI
from app.database import engine
from app import models
from app.routes import todos

# Buat semua table
models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# Include router dari routes/todos.py
app.include_router(todos.router, prefix="/todos", tags=["Todos"])

@app.get("/")
def read_root():
    return {"message": "Welcome to FastAPI Todadsdsaddasdo Apdasdap!"}
