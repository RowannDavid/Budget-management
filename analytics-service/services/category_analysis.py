import pandas as pd

def analyze_expenses(df: pd.DataFrame):
    """
    Groupe les dépenses par catégorie et calcule le total et le pourcentage.
    """
    # Groupement par catégorie
    category_totals = df.groupby('category')['amount'].sum().to_dict()
    
    # Calcul du total global
    total_spend = df['amount'].sum()
    
    # Calcul des pourcentages
    category_percentages = {cat: round((amt / total_spend) * 100, 2) for cat, amt in category_totals.items()}
    
    return {
        "totals": category_totals,
        "percentages": category_percentages,
        "total_global": total_spend
    }
