import React from "react";
import "./App.css";

export default function App() {
  const typeRef = React.useRef(null);
  const audioRef = React.useRef(null);
  const canvasRef = React.useRef(null);

  const [started, setStarted] = React.useState(false);
  const [startTyping, setStartTyping] = React.useState(false);

  const [win, setWin] = React.useState(false);

  const [emojiPos, setEmojiPos] = React.useState({
    top: 50,
    left: 50,
    count: 0,
    catchable: false,
  });

  const confettiRef = React.useRef([]);
  const rafRef = React.useRef(null);

  const topWords = [
    { word: "Crazy", count: 54 },
    { word: "amazing (ik i am)", count: 53 },
    { word: "oui", count: 45 },
    { word: "vm (of course)", count: 43 },
    { word: "har (bec am always funny)", count: 38 },
  ];

  const jokeWord = { word: "lailaphobic and fuckass", count: 10 };
  const blockedCount = 7;
  const pedoCount = 4;

  // TYPE TRIGGER
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartTyping(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (typeRef.current) observer.observe(typeRef.current);
    return () => observer.disconnect();
  }, []);

  // START EXPERIENCE
  const startExperience = async () => {
    setStarted(true);
    try {
      await audioRef.current.play();
    } catch {}
  };

  // EMOJI GAME (MOBILE + PC FIX)
  const moveEmoji = (e) => {
    e?.preventDefault?.();

    setEmojiPos((prev) => {
      const next = prev.count + 1;

      if (next >= 4) {
        return { ...prev, count: 4, catchable: true };
      }

      return {
        top: Math.random() * 70 + 10,
        left: Math.random() * 70 + 10,
        count: next,
        catchable: false,
      };
    });
  };

  // CONFETTI SPAWN
  const spawnConfetti = () => {
    const colors = ["#ff4d6d", "#ffd166", "#06d6a0", "#4cc9f0", "#f72585"];

    confettiRef.current = Array.from({ length: 180 }, () => ({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      vx: (Math.random() - 0.5) * 14,
      vy: Math.random() * -12 - 6,
      g: 0.25,
      size: Math.random() * 6 + 2,
      life: 140,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
  };

  // CONFETTI LOOP
  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    const render = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      confettiRef.current.forEach((p) => {
        p.vy += p.g;
        p.x += p.vx;
        p.y += p.vy;
        p.life--;

        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, p.size, p.size);
      });

      confettiRef.current = confettiRef.current.filter((p) => p.life > 0);

      rafRef.current = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // TYPEWRITER
  const Typewriter = ({ text, start }) => {
    const [out, setOut] = React.useState("");

    React.useEffect(() => {
      if (!start) return;

      let i = 0;
      const interval = setInterval(() => {
        setOut(text.slice(0, i));
        i++;
        if (i > text.length) clearInterval(interval);
      }, 40);

      return () => clearInterval(interval);
    }, [start, text]);

    return <>{out}</>;
  };

  return (
    <div className="container">

      {/* CONFETTI CANVAS */}
      <canvas
        ref={canvasRef}
        className="confettiCanvas"
      />

      {/* START SCREEN */}
      {!started && (
        <div className="overlay" onClick={startExperience}>
          <h1>click anywhere to start 🎧</h1>
        </div>
      )}

      {/* MUSIC */}
      <div className="music">
        <audio ref={audioRef} controls>
          <source src="/music.mp3.mp3" type="audio/mpeg" />
        </audio>
      </div>

      {/* CONTENT */}
      <section className="section">
        <h1>HAPPY BIRTHDAY 🎉</h1>
      </section>

      <section className="section">
        <h2>top words you said</h2>
      </section>

      {topWords.map((w, i) => (
        <React.Fragment key={i}>
          <section className="section">
            <h1 className="highlight">{w.word}</h1>
          </section>
          <section className="section">
            <h2>{w.count} times</h2>
          </section>
        </React.Fragment>
      ))}

      <section className="section special">
        <h2>{jokeWord.word}</h2>
        <h2>{jokeWord.count} times</h2>
      </section>

      <section className="section special">
        <h2>blocked {blockedCount} times</h2>
        <h2>pedo jokes {pedoCount}</h2>
      </section>

      {/* TYPEWRITER */}
      <section className="section typewrap" ref={typeRef}>
        <h2>
          <Typewriter
            start={startTyping}
            text="I know its not much but I really appreciate you a lot and this is just for you :D"
          />
        </h2>
      </section>

      {/* GAME */}
      <section className="section game">
        <h2>catch me 🎉</h2>

        <button
          className="emoji"
          onMouseEnter={moveEmoji}
          onTouchStart={moveEmoji}
          onClick={() => {
            if (emojiPos.catchable) {
              setWin(true);
              spawnConfetti();

              setTimeout(() => setWin(false), 5000);

              setEmojiPos({
                top: 50,
                left: 50,
                count: 0,
                catchable: false,
              });
            }
          }}
          style={{
            top: emojiPos.top + "vh",
            left: emojiPos.left + "vw",
          }}
        >
          🎉
        </button>
      </section>

      {win && (
        <div className="winScreen">
          <h1>HAPPY BIRTHDAY 🎉</h1>
        </div>
      )}
    </div>
  );
}
