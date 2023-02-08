import json
from pymongo import MongoClient
import pandas as pd
from pandas.io.json import json_normalize

#Définition de la connexion à la base de données
myClient = MongoClient("mongodb://localhost:27017/")
myDB = myClient["neoim-sentry"]
myCollection = myDB["neos"]

#Chargement du fichier JSON
with open("neos.json", "r") as file:
    json_data = json.load(file)
#Création d'un dataframe à partir du fichier JSON
df = json_normalize(json_data)
#Conversion des colonnes en float
df["ps_max"] = df["ps_max"].astype(float)
df["h"] = df["h"].astype(float)
#Insertion des données dans la base de données
myCollection.insert_many(df.to_dict('records'))
