from flask import Flask
from pymongo import MongoClient
import requests
import json
import pandas as pd

api="https://ssd-api.jpl.nasa.gov/sentry.api?h-max=99&ps-min=-10&ip-min=1e-10"

def get_data(api):
    response = requests.get(api)
    data = response.json()
    return data

app = Flask(__name__)
#Définition de la connexion à la base de données
myClient = MongoClient("mongodb://localhost:27017/")
myDB = myClient["neoim-sentry"]
myCollection = myDB["neos"]

@app.route("/")
def uploadData():
    data=get_data(api)
    #Transform data into json
    json_data = json.dumps(data)
    #Destructure json_data the data part
    json_data = json.loads(json_data)
    json_data = json_data["data"]
    #Création d'un dataframe à partir du fichier JSON
    df = pd.DataFrame(json_data)
    #Conversion des colonnes en float
    df["ps_max"] = df["ps_max"].astype(float)
    df["h"] = df["h"].astype(float)
    df["diameter"] = df["diameter"].astype(float)
    df["ip"] = df["ip"].astype(float)
    df["ps_cum"] = df["ps_cum"].astype(float)
    df["ts_max"] = df["ts_max"].astype(float)
    df["last_obs_jd"] = df["last_obs_jd"].astype(float)
    df["v_inf"] = df["v_inf"].astype(float)
    #For each row in the dataframe verify if the "des" is in the database, if not insert it
    for index, row in df.iterrows():
        if myCollection.find_one({"des": row["des"]}) is None:
            print("Inserting data in MongoDB", row["des"])
            myCollection.insert_one(row.to_dict())
    #myCollection.insert_many(df.to_dict('records'))
    print("Data inserted in MongoDB")
    return df.to_dict('records')