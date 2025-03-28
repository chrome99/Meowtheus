# 🐱 Meowtheus

Meowtheus is an application for monitoring and streaming real-time meow events from your cats.

## Current Features

- **Real-time Meow Streaming**: Live-stream of cat meows using Server-Sent Events (SSE).
- **Animations and Effects**: Smooth animations and auto-scrolling for the latest meow events.
- **Multi-cat Support**: Prepared to handle multiple cats (currently mocked for testing).

## App Demo
![meowtheus-demo](https://github.com/user-attachments/assets/531938d8-b02e-48e8-bb9a-27692483b7ef)

## Technology Stack

- **Frontend**: Svelte 5, Tailwind CSS
- **Backend**: NestJS, Server-Sent Events
- **Deployment**: Planned deployment on Vercel & Rails

## How It Works

1. **Cat Devices (Future)**: Small, lightweight hardware devices record meow events and send data to the backend.
2. **Backend**: NestJS receives and broadcasts meow events via SSE.
3. **Frontend**: Svelte frontend displays meows in real-time.

## Planned Features

- **Hardware Integration**: Support physical devices (ESP32 or similar) to detect and stream actual cat meows.
- **Cat Profiles**: Customize and filter meows by individual cats.
- **Data Analysis**: Insightful analytics on meow patterns (frequency, time, etc.).

## Running Locally

**Backend:**
```bash
cd backend
npm install
npm run start:dev
```

**Emitter:**
```bash
cd emitter
npm install
npm run dev
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```


Open your browser at [http://localhost:5173](http://localhost:5173)
