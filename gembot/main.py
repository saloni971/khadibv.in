from flask import Flask, render_template, request, jsonify
import google.generativeai as genai
import time

app = Flask(__name__)

# Configure Gemini API
genai.configure(api_key="AIzaSyBBmokCyVDX83FsFuSrAWNusOHDPIKL53M")
model = genai.GenerativeModel("gemini-1.5-pro-latest")

# Store only the last 5 messages for context
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
    chat_input = "\n".join(conversation_history[-5:])  # Keep only last 5 messages

    # Retry mechanism for API call (3 attempts)
    for _ in range(3):
        try:
            response = model.generate_content(
                chat_input, 
                generation_config={"max_output_tokens": 50}  # Max ~30 words
            )
            bot_reply = response.text.strip()
            break  # Exit loop if response is successful
        except genai.GoogleGenerativeAIError as e:
            print("API Error:", str(e))
            time.sleep(2)  # Wait before retrying
            bot_reply = "⚠️ Error: Unable to process your request. Please try again."

    conversation_history.append(f"{bot_reply}")  # Store bot response

    return jsonify({"reply": bot_reply})

if __name__ == "__main__":
    app.run(debug=True)