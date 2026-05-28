import React from "react";
import "./App.css";

export default function App() {
  const [startTyping, setStartTyping] = React.useState(false);
const typeRef = React.useRef(null);
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

  if (typeRef.current) {
    observer.observe(typeRef.current);
  }

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
    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container">

      {/* MUSIC (FIXED TOP RIGHT) */}
      <div className="music">
        <audio controls className="audio">
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

      {/* TOP WORDS */}
      {topWords.map((item, index) => (
        <section className="section" key={index}>
          <h1 className="highlight">{item.word}</h1>
          <h2>{item.count} times</h2>
        </section>
      ))}

      {/* JOKE */}
      <section className="section">
        <h2>
          if i had a dime for everytime you said "{jokeWord.word}"
        </h2>
        <h2>
          i'd have {jokeWord.count} dimes which isn't alot but funny
        </h2>
      </section>

      {/* STATS */}
      <section className="section">
        <h2>i have been emotionally blocked {blockedCount} times</h2>
      </section>

      <section className="section">
        <h2>you have made 6-7 jokes 17 times🫩</h2>
      </section>

      <section className="section">
        <h2>
          you called yourself a pedo because you're one year older
        </h2>
      </section>

      <section className="section">
        <h2>{pedoCount} times</h2>
      </section>

      <section className="section">
        <h2>now that is everything, scroll down more tho &gt;:(</h2>
      </section>

     <section className="section" ref={typeRef}>
  <h2>
    <Typewriter
      start={startTyping}
      speed={55}
      text="I know its not much but i really wanted to tell you that i enjoy your friendship so much you are the best and those 50 days (yes 50 days only can you imagine?) were the best you helped me through a really hard time and listened to me yap abt some bs and in return blessed me with your amazing vns with the most gossip i ever heard which is prolly higher than the recommended amount for the average human male, you are a really good listener.... and talker too you are the full package lol. I will always be infinitely grateful to have you as a friend and i will forever cherish our friendship :D. Happy 18th birthday i hope your coming years are better and better and that we are still friends 67 years from now <3."
    />
  </h2>
</section>
    </div>
  );
}
