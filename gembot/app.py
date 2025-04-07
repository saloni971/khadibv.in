from flask import Flask, request, jsonify
import google.generativeai as genai
import os
app = Flask(__name__)

# Set up Gemini API Key
genai.configure(api_key="AIzaSyBBmokCyVDX83FsFuSrAWNusOHDPIKL53M")
model = genai.GenerativeModel("gemini-1.5-pro-latest")

# Store conversation history
conversation_history = []

@app.route("/chat", methods=["POST"])
def chat():
    global conversation_history
    
    data = request.get_json()
    user_message = data.get("message", "").strip()

    if not user_message:
        return jsonify({"error": "No message provided"}), 400

    # Maintain conversation history (context-aware)
    conversation_history.append(f"User: {user_message}")

    # Send last 5 messages to maintain context
    chat_input = "\n".join(conversation_history[-5:])

    response = model.generate_content(chat_input, generation_config={"max_output_tokens": 2000})  
    bot_reply = response.text.strip()