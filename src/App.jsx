import React from "react";
import "./App.css";

export default function App() {
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

  // ⭐ TYPEWRITER COMPONENT
  const Typewriter = ({ children, speed = 80 }) => {
    const text = children;
    const [out, setOut] = React.useState("");

    React.useEffect(() => {
      let i = 0;

      const interval = setInterval(() => {
        setOut(text.slice(0, i));
        i++;

        if (i > text.length) clearInterval(interval);
      }, speed);

      return () => clearInterval(interval);
    }, [text, speed]);

    return <>{out}</>;
  };

  return (
    <div className="container">
      <div className="music-player">
  <iframe
    width="320"
    height="80"
    src="https://www.youtube.com/embed/rHvQakk1zMA"
    title="Laufey - From The Start"
    frameBorder="0"
    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
  />
</div>

      {/* SECTION 1 */}
      <section className="section">
        <h1>HAPPY BIRTHDAYY 🎉</h1>
      </section>
  

      {/* SECTION 2 */}
      <section className="section">
        <h2>
          it took some time but i compiled all the words you said and ranked your top 5 most used words..
        </h2>
      </section>

      {/* TOP WORDS */}
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

      {/* JOKE */}
      <section className="section">
        <h2>
          if i had a dime for everytime you said "{jokeWord.word}"
        </h2>
      </section>

      <section className="section">
        <h2>
          i'd have {jokeWord.count} dimes which isn't alot but funny
        </h2>
      </section>

      {/* STATS */}
      <section className="section">
        <h2>i have been</h2>
      </section>

      <section className="section">
        <h2 className="red">
          emotionally blocked {blockedCount} times
        </h2>
      </section>

      <section className="section">
        <h2>you have made</h2>
      </section>

      <section className="section">
        <h2>6-7 jokes 17 times🫩</h2>
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

      {/* FINAL ENDING + MUSIC */}
      <section className="section">
        <h2>
          <Typewriter speed={80}>
            {"I know its not much but i really wanted to tell you that i enjoy your friendship so much you are the best and those 50 days (yes 50 days only can you imagine?) were the best you helped me through a really hard time and listened to me yap abt some bs and in return blessed me with your amazing vns with the most gossip i ever heard which is prolly higher than the recommended amount for the average human male, you are a really good listener.. and talker too you are the full package lol. happy 18th birthday i hope your coming years are better and better and that we are still friends 67 years from now <3."}
          </Typewriter>
        </h2>

        <iframe
          width="100%"
          height="166"
          style={{ marginTop: "20px", borderRadius: "12px" }}
          src="https://www.youtube.com/embed/rHvQakk1zMA"
          title="Laufey - From The Start"
          frameBorder="0"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </section>

    </div>
  );
}
