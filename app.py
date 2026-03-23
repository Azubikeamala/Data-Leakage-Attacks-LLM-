from flask import Flask, request, jsonify, render_template
from flask_cors import CORS   # 👈 ADD THIS
from llm.mock_llm import generate_response

app = Flask(__name__)
CORS(app)   # 👈 ADD THIS (VERY IMPORTANT)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()

    prompt = data.get("prompt")
    user_id = data.get("user_id")

    if not prompt or not user_id:
        return jsonify({"error": "Missing prompt or user_id"}), 400

    response = generate_response(prompt, user_id)

    return jsonify({
        "user": user_id,
        "prompt": prompt,
        "response": response
    })

if __name__ == "__main__":
    app.run(debug=True)