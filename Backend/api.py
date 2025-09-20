from fastapi import APIRouter

router = APIRouter()

@router.get("/job_descriptions")
def get_job_descriptions():
    return {"message": "List of job descriptions"}

# Make sure in main.py you include this router
# main.py
from fastapi import FastAPI
from Backend import api

app = FastAPI()
app.include_router(api.router)

from fastapi import FastAPI

app = FastAPI()

@app.get("/job_descriptions")
def get_job_descriptions():
    return {"message": "List of job descriptions"}
