![](https://media.discordapp.net/attachments/576529794414673963/1072829995023601674/Pr._rootKitty_Banner_for_a_website_that_displays_Near_Earth_Obj_933217e6-a2bd-4eb2-9ebf-ce3d2a026bdf.png?width=593&height=593)

## NEOIM Sentry

📡 Near Earth Object Impact Monitoring provides datas gathered from the below systems accessible via NASA's open API about NEOs that has potential future Earth impact events based on currently available observations.

## Introduction

Scout provides trajectory analysis and hazard assessment for recently detected objects on the Minor Planet Center’s
Near-Earth Object Confirmation Page (NEOCP). Objects on these pages are unconfirmed; their designations are
user-assigned and unofficial. These objects could be real asteroids, but they cannot be officially designated until they
are confirmed by additional observations.

## Sentry System API
This API provides access to results from the CNEOS Sentry system.

[Link to Sentry API documentation](https://ssd-api.jpl.nasa.gov/doc/sentry.html)

## MongoDB
The dashboard is using MongoDB as a database to store the data from the API as a backup.

## Python files

The Python API is available at the root of the project named `api-python.py`


## Lancement du projet

Creer un fichier .env.local et y renseigner les variables d'environnement requises.

Lancer le fichier Python 'api-python.py' pour récupérer les données de l'API et les stocker dans la base de données MongoDB.

```bash
flask --app api-python.py run
```

Finalement, lancer le projet NextJS

```bash
npm run dev
# or
yarn dev
```

Se rendre sur [http://localhost:3000](http://localhost:3000) avec votre navigateur pour voir le résultat.

[API routes](https://nextjs.org/docs/api-routes/introduction) peuvent être utilisées pour créer des API.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated
as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.
