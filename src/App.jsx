import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import Confetti from "react-confetti";
import Typewriter from "typewriter-effect";

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

  const [showConfetti, setShowConfetti] = useState(true);
  const [startTyping, setStartTyping] = useState(false);
  const finalRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setStartTyping(true);
      }
    });

    if (finalRef.current) observer.observe(finalRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="container">

      {/* 🎉 FLOATING EMOJIS */}
      <div className="emoji-bg">
        <span>🎉</span>
        <span>💛</span>
        <span>🎉</span>
        <span>💛</span>
        <span>🎉</span>
        <span>💛</span>
        <span>🎉</span>
        <span>💛</span>
        <span>🎉</span>
      </div>

      {/* HERO */}
      <section className="section">
        {showConfetti && <Confetti />}
        <h1>HAPPY BIRTHDAYY 🎉</h1>
      </section>

      {/* INTRO */}
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
        <h2 className="stat">
          i'd have {jokeWord.count} dimes which isn't alot but funny
        </h2>
      </section>

      {/* STATS */}
      <section className="section">
        <h2 className="stat">i have been emotionally blocked {blockedCount} times</h2>
      </section>

      <section className="section">
        <h2 className="stat">6-7 jokes 17 times🫩</h2>
      </section>

      <section className="section">
        <h2 className="stat">
          you called yourself a pedo because you're one year older {pedoCount} times
        </h2>
      </section>

      {/* FINAL LEAD */}
      <section className="section">
        <h2>
          now that is everything, scroll down more tho &gt;:(
        </h2>
      </section>

      {/* FINAL MESSAGE */}
      <section className="section" ref={finalRef}>
        {startTyping && (
          <h2>
            <Typewriter
              options={{
                delay: 45,
                cursor: "|",
              }}
              onInit={(typewriter) => {
                typewriter
                  .typeString(
                    "I know its not much but i really wanted to tell you that i enjoy your friendship so much you are the best and those 50 days (yes 50 days only can you imagine?) were the best you helped me through a really hard time and listened to me yap abt some bs and in return blessed me with your amazing vns with the most gossip i ever heard which is prolly higher than the recommended amount for the average human male, you are a really good listener.. and talker too you are the full package lol. "
                  )
                  .pauseFor(800)
                  .typeString(
                    "happy 18th birthday i hope your coming years are better and better and that we are still friends 67 years from now <3."
                  )
                  .start();
              }}
            />
          </h2>
        )}
      </section>

    </div>
  );
}