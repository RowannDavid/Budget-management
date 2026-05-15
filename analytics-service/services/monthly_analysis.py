import pandas as pd

def get_monthly_trends(df: pd.DataFrame):
    """
    Analyse l'évolution des dépenses mois par mois.
    """
    # Conversion de la colonne date en format datetime
    df['date'] = pd.to_datetime(df['date'])
    
    # Extraction du mois et de l'année
    df['month_year'] = df['date'].dt.to_period('M').astype(str)
    
    # Groupement par mois
    monthly_trends = df.groupby('month_year')['amount'].sum().to_dict()
    
    return monthly_trends
