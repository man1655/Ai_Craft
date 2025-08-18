from flask import Flask, request, jsonify
from flask_cors import CORS
import aiml
import os

app = Flask(__name__)
CORS(app)

# AIML Kernel Initialization
kernel = aiml.Kernel()

# Load saved brain file or learn from startup.xml
if os.path.isfile("bot/bot_brain.brn"):
    kernel.bootstrap(brainFile="bot/bot_brain.brn")
else:
    kernel.bootstrap(learnFiles="bot/startup.xml", commands="LOAD AIML")
    kernel.saveBrain("bot/bot_brain.brn")

@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    user_message = data.get("message", "")
    response = kernel.respond(user_message.upper())
    return jsonify({"response": response})

if __name__ == "__main__":
    app.run(port=4000, debug=True)
