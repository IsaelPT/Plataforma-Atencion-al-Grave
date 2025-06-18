from app import app

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("SimUci.app.main:app", reload=True)