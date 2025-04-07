from flask import Flask, render_template, request, jsonify
import google.generativeai as genai

app = Flask(__name__)

# Configure Gemini API
genai.configure(api_key="AIzaSyBBmokCyVDX83FsFuSrAWNusOHDPIKL53M")
model = genai.GenerativeModel("gemini-1.5-pro-latest")

conversation_history = []

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/chat", methods=["POST"])
def chat():
    global conversation_history
    
    user_input = request.json.get("message", "").strip()
    
    if not user_input:
        return jsonify({"error": "Empty message"}), 400

    conversation_history.append(f"User: {user_input}")
    chat_input = "\n".join(conversation_history[-5:])  # Keep context of last 5 messages

    response = model.generate_content(chat_input, generation_config={"max_output_tokens": 200})
    
    if response and hasattr(response, "text") and response.text:
        bot_reply = response.text.strip()
    else:
        bot_reply = "⚠️ No valid response received."
