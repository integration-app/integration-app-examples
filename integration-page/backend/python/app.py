import datetime
import json

from flask import Flask
from flask_cors import CORS
import jwt

app = Flask(__name__)
CORS(app)

@app.route("/integration-token")
def get_integration_app_token():
    # Your workspace key and secret.
    # You can find them on the Settings page.
    WORKSPACE_KEY = "03e73c01-5d40-4f2c-9e96-01c4e25290d5"
    WORKSPACE_SECRET = "bb6f60cec16d8028a7c411b567d8a4b5358daa3a06c0666f8b40d6cf8e6d86e5"

    encoded_jwt = jwt.encode(
        {"id": "{USER_ID}",  # Identifier of user or organization.
         "name": "{USER_NAME}",  # Human-readable name (it will simplify troubleshooting)
         "iss": WORKSPACE_KEY,
         # "fields": <user fields value>, # (optional) Any user fields you want to attach to your user.
         "exp": datetime.datetime.now() + datetime.timedelta(seconds=1440)
         }, WORKSPACE_SECRET, algorithm="HS256")
    return json.dumps(encoded_jwt)
