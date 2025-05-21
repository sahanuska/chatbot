AI-Powered Multilingual Customer Support Chatbot
Welcome to my chatbot, your empathetic AI customer support chatbot designed to assist users with friendly, context-aware, and multilingual responses! Built using Flask, LangChain, Groq LLM, and Pinecone, this project aims to bring a human-like touch to automated support systems.

✨ Features

🌐 Multilingual Support: Automatically detects the user's language.

💬 Conversation Memory: Maintains chat history per session.

🔍 Vector Search: Retrieves relevant info using Pinecone's vector store.

🤖 LLM Integration: Powered by Groq's llama-3.3-70b-versatile model.

📄 Contextual Prompting: Structured responses with empathy and clarity.

🛠️ Tech Stack

Flask - Lightweight Python web framework

LangChain - Framework to manage LLM prompts and memory

Groq API - LLM backend

Pinecone - Vector database for semantic search

LangDetect - Auto-detect user language

🚀 How to Run

1. Clone the repo

git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name

2. Install dependencies

pip install -r requirements.txt

3. Add environment variables

Create a .env file in the root directory:

FLASK_SECRET_KEY=your_flask_secret_key
GROQ_API_KEY=your_groq_api_key
PINECONE_API_KEY=your_pinecone_api_key

4. Run the app

python app.py

Open your browser and go to http://127.0.0.1:5000

📂 Project Structure

├── app.py               # Flask backend with LangChain logic
├── templates/
│   └── index.html       # Basic frontend UI
├── .env                 # Environment variables
├── requirements.txt     # All dependencies

🧠 How It Works

User enters a message → Language is auto-detected
LangChain retrieves context using Pinecone
Prompt is customized with conversation history + language
Groq LLM generates a friendly, helpful reply 
Output is formatted and shown in the chat UI
