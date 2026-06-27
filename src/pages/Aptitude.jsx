import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Aptitude() {
  const navigate = useNavigate();
  
  const questions = [
    {
      question: "A train 150m long passes a pole in 10 seconds. Find its speed.",
      options: ["54 km/hr", "60 km/hr", "72 km/hr", "48 km/hr"],
      answer: "54 km/hr",
      explanation: "Speed = Distance / Time = 150/10 = 15 m/s = 54 km/hr",
    },
    {
      question: "A shopkeeper marks an item 25% above cost price and gives 10% discount. Profit percentage?",
      options: ["10%", "12.5%", "15%", "20%"],
      answer: "12.5%",
      explanation: "SP = 125 × 90/100 = 112.5, so profit = 12.5%",
    },
    {
      question: "Ratio of ages of A and B is 3:5. Sum of ages is 32. Age of B?",
      options: ["18", "20", "22", "24"],
      answer: "20",
      explanation: "3x + 5x = 32 → 8x = 32 → x = 4 → B = 20",
    },
    {
      question: "A can do a work in 12 days and B in 18 days. Together they complete in?",
      options: ["7.2 days", "8 days", "9 days", "6 days"],
      answer: "7.2 days",
      explanation: "1 day work = 1/12 + 1/18 = 5/36, total time = 36/5",
    },
  ];

  const [selected, setSelected] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(900);
  const [testCompleted, setTestCompleted] = useState(false);
  const [testStarted, setTestStarted] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const current = questions[currentQuestion];

  useEffect(() => {
    if (!testStarted || testCompleted) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [testStarted, testCompleted]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h1 style={{ fontSize: "32px", margin: 0 }}>Aptitude Practice</h1>
        {testStarted && (
          <p style={{ backgroundColor: "white", padding: "10px 15px", borderRadius: "8px", fontWeight: "bold" }}>
            ⏱️ Time Left: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
          </p>
        )}
      </div>

      {/* Progress */}
      {testStarted && (
        <p style={{ display: "inline-block", backgroundColor: "white", padding: "10px 15px", borderRadius: "8px", marginBottom: "30px" }}>
          Question {currentQuestion + 1} of {questions.length}
        </p>
      )}

      {/* Start Button Screen */}
      {!testStarted && (
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "50vh", textAlign: "center" }}>
          <h2 style={{ fontSize: "28px", marginBottom: "10px" }}>Ready to test your aptitude skills?</h2>
          <p style={{ color: "gray", marginBottom: "25px" }}>5 Questions • 15 Minutes</p>
          <button onClick={() => setTestStarted(true)} style={{ padding: "14px 30px", backgroundColor: "#2563eb", color: "white", border: "none", borderRadius: "10px", cursor: "pointer" }}>
            Start Test
          </button>
        </div>
      )}

      {/* Question Card */}
      {testStarted && (
        <div style={{ backgroundColor: "white", padding: "30px", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
          <h2 style={{ marginBottom: "20px" }}>{current.question}</h2>

          {current.options.map((opt) => (
            <label key={opt} style={{ display: "block", padding: "12px", marginBottom: "10px", borderRadius: "8px", cursor: "pointer", backgroundColor: submitted && opt === current.answer ? "#bbf7d0" : submitted && opt === selected && opt !== current.answer ? "#fecaca" : selected === opt ? "#e0f2fe" : "#f3f4f6" }}>
              <input type="radio" name="answer" value={opt} checked={selected === opt} onChange={() => setSelected(opt)} disabled={submitted} /> {opt}
            </label>
          ))}

          <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
            <button disabled={!selected || submitted} onClick={() => {
              setSubmitted(true);
              if (selected === current.answer) setScore((prev) => prev + 1);
              if (currentQuestion === questions.length - 1) setTestCompleted(true);
            }} style={{ padding: "12px 20px", backgroundColor: "#2563eb", color: "white", border: "none", borderRadius: "8px", cursor: "pointer" }}>
              Submit
            </button>

            {submitted && currentQuestion < questions.length - 1 && (
              <button onClick={() => { setCurrentQuestion(currentQuestion + 1); setSelected(""); setSubmitted(false); }} style={{ padding: "12px 20px", backgroundColor: "#16a34a", color: "white", border: "none", borderRadius: "8px", cursor: "pointer" }}>
                Next Question
              </button>
            )}

{submitted && currentQuestion === questions.length - 1 && (
  <button 
    onClick={() => {
      const resultData = {
        type: "aptitude",
        score: score,
        total: questions.length,
      };

      // 🚀 Send the data to deployed backend
fetch("https://mockmate-backend-h3dz.onrender.com/api/results", {
  method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(resultData),
      })
      .then((res) => {
        if (!res.ok) throw new Error("Server error");
        return res.json();
      })
      .then(() => {
        setShowResult(true);
      })
      .catch((err) => {
        console.error("Failed writing data to Mongo database:", err);
        // Fallback safety to show results modal if server has hiccups
        setShowResult(true); 
      });
    }} 
    style={{ padding: "12px 20px", backgroundColor: "#dc2626", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "600" }}
  >
    End Exam
  </button>
)}
          </div>

          {submitted && (
            <div style={{ marginTop: "20px", padding: "15px", backgroundColor: "#f9fafb", borderRadius: "8px" }}>
              <h3>Explanation</h3>
              <p>{current.explanation}</p>
            </div>
          )}
        </div>
      )}

      {/* Result Modal */}
      {showResult && (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center", backdropFilter: "blur(5px)", zIndex: 1000 }}>
          <div style={{ backgroundColor: "white", padding: "40px", borderRadius: "16px", width: "400px", textAlign: "center" }}>
            <h2>Exam Completed 🎉</h2>
            <h1>{score} / {questions.length}</h1>
            <p>Good work. Keep practicing.</p>
            <div style={{ marginTop: "20px" }}>
              <button onClick={() => window.location.reload()} style={{ marginRight: "10px", padding: "10px 16px", cursor: "pointer" }}>Retry</button>
              <button onClick={() => navigate("/dashboard")} style={{ padding: "10px 16px", backgroundColor: "#2563eb", color: "white", border: "none", borderRadius: "8px", cursor: "pointer" }}>Dashboard</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Aptitude;
