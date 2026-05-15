from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
import pandas as pd
from services.category_analysis import analyze_expenses

app = FastAPI(title="Budget Manager Analytics API")

class ExpenseItem(BaseModel):
    amount: float
    category: str
    date: str

@app.get("/")
def read_root():
    return {"status": "online", "message": "Budget Manager Analytics Service is running"}

@app.post("/analytics/category-expenses")
def get_category_expenses(expenses: List[ExpenseItem]):
    try:
        # Conversion de la liste d'objets en DataFrame Pandas
        df = pd.DataFrame([e.dict() for e in expenses])
        
        if df.empty:
            return {}

        results = analyze_expenses(df)
        return results
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
