# app/routes/analytics_routes.py
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.middleware.auth_middleware import get_current_user
from app.models.transaction_model import Transaction
from app.analytics.expense_analyzer import analyze_expenses


router = APIRouter(prefix="/analytics")


@router.get("/expenses")
def expense_pie_chart(
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):

    transactions = db.query(Transaction).all()

    summary = analyze_expenses(transactions)

    return summary