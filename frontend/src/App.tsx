import { useEffect, useRef, useState } from 'react';

type MeowEvent = {
  catId: string;
  timestamp: string;
};

export default function App() {
  const [meows, setMeows] = useState<MeowEvent[]>([]);
  const [connected, setConnected] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const source = new EventSource('http://localhost:3000/meow/stream');

    source.onopen = () => setConnected(true);
    source.onerror = () => setConnected(false);
    source.onmessage = (e) => {
      try {
        const data: MeowEvent = JSON.parse(e.data);
        setMeows((prev) => [...prev, data]);
      } catch (err) {
        console.error('Bad data:', e.data);
      }
    };

    return () => source.close();
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [meows]);

  return (
    <main className="min-h-screen min-w-screen bg-zinc-950 text-white px-6 py-10 font-sans">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center tracking-tight">
          🐱 Meowtheus
        </h1>

        {!connected ? (
          <p className="text-zinc-400 text-center animate-pulse">
            🔄 Connecting to meow stream...
          </p>
        ) : meows.length === 0 ? (
          <p className="text-zinc-400 text-center">
            🧘‍♂️ No meows yet. Enjoy the silence.
          </p>
        ) : (
          <div
            ref={scrollRef}
            className="max-h-[400px] overflow-y-auto space-y-4 pr-2"
            style={{ scrollbarWidth: 'none' }}
          >
            {meows.map(({ catId, timestamp }, i) => (
              <div
                key={timestamp + i}
                className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 shadow transition"
              >
                <div className="flex justify-between items-center">
                  <span className="text-xl font-medium">{catId}</span>
                  <span className="text-sm text-zinc-400">
                    {new Date(timestamp).toLocaleTimeString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

