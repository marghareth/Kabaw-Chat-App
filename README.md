# Kabaw Chat App

> ⚠️ **Note:** This project was built as a tryout/practice task to explore real-time web communication using WebSockets.

A real-time chat application where users can join channels and exchange messages instantly — no account or sign-up required. Just enter a username, pick a channel, and start chatting.

---

## 🔗 Live Demo

[Click here to try it out](https://kabaw-chat-app.vercel.app/) 

---

## What It Does

- **Real-time messaging** — messages appear instantly for all users in the same channel
- **Multi-channel support** — users can join different channels by name
- **Join screen** — enter a username and channel name to connect
- **System notifications** — the chat notifies when users join or leave
- **Auto-reconnect** — the client automatically attempts to reconnect if the connection drops
- **Duplicate prevention** — messages are deduplicated on the client side to avoid repeats
- **Responsive UI** — works on desktop and mobile browsers

---

## Purpose

This project was built as a **tryout task** to practice and demonstrate:

- Working with the **WebSocket API** in a React frontend
- Managing **real-time state** across multiple connected clients
- Building a **custom React hook** (`useWebSocket`) to encapsulate connection logic
- Structuring a **TypeScript React project** with clean separation of components, hooks, types, and utilities
- Deploying a **full-stack app** with a Node.js WebSocket backend and a React frontend on separate platforms

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, TypeScript, Vite |
| Styling | Tailwind CSS v4 |
| Icons | Lucide React |
| Backend | Node.js, `ws` (WebSocket library) |
| Frontend Hosting | Vercel |
| Backend Hosting | Railway |

---

## How It Works

The frontend connects to a WebSocket server using a URL that includes the username and channel as query parameters:

```
ws://localhost:8080/ws?username=Alice&channel=general
```

Once connected, the server assigns the user a unique ID and broadcasts messages to everyone in the same channel in real time.

---

## Running Locally

You need two terminals — one for the backend server, one for the frontend.

**1. Start the WebSocket server**
```bash
cd kabaw-server
npm install
node server.js
```

**2. Start the frontend**
```bash
cd Kabaw-Chat-App-main
npm install
npm run dev
```

Then open `http://localhost:5173` in your browser.

---

## Project Structure

```
Kabaw-Chat-App-main/
├── src/
│   ├── components/       # UI components (Header, MessageList, MessageInput, etc.)
│   ├── hooks/            # useWebSocket — connection logic
│   ├── types/            # TypeScript interfaces
│   └── utils/            # Constants and avatar utilities
```

---

*Built by Marga · Tryout project*