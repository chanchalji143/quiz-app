import React, { useState, useEffect } from "react";
import "./App.css";

const quizData = {
  General: [
    {
      question: "What is the capital of India?",
      options: ["Delhi", "Mumbai", "Kolkata", "Chennai"],
      answer: "Delhi",
    },
    {
      question: "Which planet is known as Red Planet?",
      options: ["Earth", "Mars", "Jupiter", "Saturn"],
      answer: "Mars",
    },
  ],
  Literature: [
    {
      question: "Who wrote 'Hamlet'?",
      options: ["Shakespeare", "Tolkien", "Hemingway", "Rowling"],
      answer: "Shakespeare",
    },
    {
      question: "Who wrote 'Pride and Prejudice'?",
      options: ["Jane Austen", "Mark Twain", "J.K. Rowling", "Leo Tolstoy"],
      answer: "Jane Austen",
    },
  ],
};

function App() {
  const [category, setCategory] = useState("General");
  const [questions, setQuestions] = useState(quizData[category]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [timer, setTimer] = useState(10);

  // Timer effect
  useEffect(() => {
    if (showScore) return;
    if (timer === 0) {
      nextQuestion();
      return;
    }
    const interval = setInterval(() => setTimer(t => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer, showScore]);

  const handleAnswer = (option) => {
    if (option === questions[current].answer) {
      setScore(score + 1);
      setFeedback("✅ Correct!");
    } else {
      setFeedback(`❌ Wrong! Correct: ${questions[current].answer}`);
    }
    setTimeout(() => {
      setFeedback("");
      nextQuestion();
    }, 1000);
  };

  const nextQuestion = () => {
    const next = current + 1;
    if (next < questions.length) {
      setCurrent(next);
      setTimer(10);
    } else {
      setShowScore(true);
    }
  };

  const restartQuiz = () => {
    setCurrent(0);
    setScore(0);
    setShowScore(false);
    setTimer(10);
    setQuestions(quizData[category]);
  };

  const handleCategoryChange = (cat) => {
    setCategory(cat);
    setQuestions(quizData[cat]);
    restartQuiz();
  };

  return (
    <div className="quiz-app">
      <h1>Pro Quiz App</h1>
      <div className="category-buttons">
        {Object.keys(quizData).map((cat) => (
          <button
            key={cat}
            className={cat === category ? "active" : ""}
            onClick={() => handleCategoryChange(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {showScore ? (
        <div className="score-section">
          You scored {score} out of {questions.length}
          <button onClick={restartQuiz}>Restart Quiz</button>
        </div>
      ) : (
        <div className="question-section">
          <div className="question-count">
            Question {current + 1}/{questions.length} | ⏱ {timer}s
          </div>
          <div className="question-text">{questions[current].question}</div>
          <div className="answer-section">
            {questions[current].options.map((option, index) => (
              <button key={index} onClick={() => handleAnswer(option)}>
                {option}
              </button>
            ))}
          </div>
          {feedback && <div className="feedback">{feedback}</div>}
        </div>
      )}
    </div>
  );
}

export default App;