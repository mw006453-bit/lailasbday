import React from "react";
import "./App.css";

export default function App() {
  const [startTyping, setStartTyping] = React.useState(false);
  const typeRef = React.useRef(null);
  const audioRef = React.useRef(null);
  const [started, setStarted] = React.useState(false);

  // 🎮 GAME STATE
  const [won, setWon] = React.useState(false);
  const [showWinScreen, setShowWinScreen] = React.useState(false);

  const canvasRef = React.useRef(null);
  const confettiRef = React.useRef([]);

  const [emojiPos, setEmojiPos] = React.useState({
    top: 50,
    left: 50,
    count: 0,
    catchable: false,
  });

  // 🔥 CONFETTI SPAWN (REAL PHYSICS)
  const spawnConfetti = () => {
    const colors = ["#ff4d6d", "#ffd166", "#06d6a0", "#4cc9f0", "#f72585"];

    const particles = Array.from({ length: 140 }, () => ({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      vx: (Math.random() - 0.5) * 12,
      vy: Math.random() * -12 - 6,
      gravity: 0.28,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 6 + 3,
      life: 120,
    }));

    confettiRef.current = particles;
  };

  // 🎬 CONFETTI LOOP
  React.useEffect(() => {
    let frame;

    const draw = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      confettiRef.current.forEach((p) => {
        p.vy += p.gravity;
        p.x += p.vx;
        p.y += p.vy;
        p.life--;

        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, p.size, p.size);
      });

      confettiRef.current = confettiRef.current.filter(p => p.life > 0);

      frame = requestAnimationFrame(draw);
    };

    draw();

    return () => cancelAnimationFrame(frame);
  }, []);

  // 📜 TYPEWRITER TRIGGER
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartTyping(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (typeRef.current) observer.observe(typeRef.current);
    return () => observer.disconnect();
  }, []);

  const topWords = [
    { word: "Crazy", count: 54 },
    { word: "amazing (ik i am)", count: 53 },
    { word: "oui", count: 45 },
    { word: "vm (of course)", count: 43 },
    { word: "har (bec am always funny)", count: 38 },
  ];

  const jokeWord = {
    word: "lailaphobic and fuckass",
    count: 10,
  };

  const blockedCount = 7;
  const pedoCount = 4;

  const Typewriter = ({ text, start, speed = 55 }) => {
    const [out, setOut] = React.useState("");

    React.useEffect(() => {
      if (!start) return;

      let i = 0;

      const interval = setInterval(() => {
        setOut(text.slice(0, i));
        i++;
        if (i > text.length) clearInterval(interval);
      }, speed);

      return () => clearInterval(interval);
    }, [start, text, speed]);

    return <>{out}</>;
  };

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const startExperience = async () => {
    setStarted(true);
    try {
      await audioRef.current.play();
    } catch {}
  };

  // 🎮 GAME LOGIC
  const moveEmoji = () => {
    setEmojiPos((prev) => {
      const newCount = (prev.count || 0) + 1;

      if (newCount >= 4) {
        return { ...prev, count: 4, catchable: true };
      }

      return {
        top: Math.random() * 70 + 10,
        left: Math.random() * 70 + 10,
        count: newCount,
        catchable: false,
      };
    });
  };

  return (
    <div className="container">

      {/* 🎆 CANVAS CONFETTI */}
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 99998,
        }}
      />

      {!started && (
        <div className="overlay" onClick={startExperience}>
          <h1>click anywhere to start 🎧</h1>
        </div>
      )}

      {/* MUSIC */}
      <div className="music">
        <audio ref={audioRef} controls className="audio">
          <source src="/music.mp3.mp3" type="audio/mpeg" />
        </audio>
      </div>

      {/* TITLE */}
      <section className="section">
        <h1>HAPPY BIRTHDAYY 🎉</h1>
      </section>

      <section className="section">
        <h2>
          it took some time but i compiled all the words you said and ranked your top 5 most used words..
        </h2>
      </section>

      {topWords.map((item, index) => (
        <React.Fragment key={index}>
          <section className="section">
            <h1 className="highlight">{item.word}</h1>
          </section>
          <section className="section">
            <h2>{item.count} times</h2>
          </section>
        </React.Fragment>
      ))}

      <section className="section special">
        <h2>if i had a dime for everytime you said "{jokeWord.word}"</h2>
      </section>

      <section className="section special">
        <h2>i'd have {jokeWord.count} dimes which isn't alot but funny</h2>
      </section>

      <section className="section special">
        <h2>i have been</h2>
      </section>

      <section className="section special">
        <h2>emotionally blocked {blockedCount} times</h2>
      </section>

      <section className="section special">
        <h2>you have made 6-7 jokes</h2>
      </section>

      <section className="section special">
        <h2>17 times🫩</h2>
      </section>

      <section className="section special">
        <h2>you called yourself a pedo because you're one year older</h2>
      </section>

      <section className="section special">
        <h2>{pedoCount} times</h2>
      </section>

      <section className="section">
        <h2>now that is everything, scroll more :D</h2>
      </section>

      <section className="section" ref={typeRef}>
        <h2>
          <Typewriter
            start={startTyping}
            speed={55}
            text="I know its not much but i really wanted to tell you that i enjoy your friendship so much..."
          />
        </h2>
      </section>

      {/* GAME */}
      <section className="section game">
        <h2>catch me if you can :D</h2>

        <button
          className="emoji"
          onMouseEnter={moveEmoji}
          onClick={() => {
            if (emojiPos.catchable) {
              setWon(true);
              setShowWinScreen(true);

              spawnConfetti();

              setTimeout(() => {
                setShowWinScreen(false);
                setWon(false);
              }, 5000);
            }
          }}
          style={{
            position: "fixed",
            top: emojiPos.top + "vh",
            left: emojiPos.left + "vw",
          }}
        >
          🎉
        </button>
      </section>

      {/* WIN SCREEN */}
      {showWinScreen && (
        <div className="winScreen">
          <h1>HAPPY BIRTHDAYY 🎉</h1>
        </div>
      )}
    </div>
  );
}
