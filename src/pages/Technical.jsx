import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Technical() {
  const navigate = useNavigate();

  const questions = [
    {
      question: "Which data structure uses LIFO principle?",
      options: ["Queue", "Stack", "Array", "Tree"],
      answer: "Stack",
      explanation: "Stack follows Last In First Out (LIFO) principle.",
    },
    {
      question: "What is the time complexity of binary search?",
      options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"],
      answer: "O(log n)",
      explanation: "Binary search divides array into halves each step.",
    },
    {
      question: "Which of the following is NOT a DBMS model?",
      options: ["Hierarchical", "Network", "Relational", "Compilation"],
      answer: "Compilation",
      explanation: "Compilation is not a DBMS model.",
    },
    {
      question: "Which OS component manages memory?",
      options: ["Kernel", "Compiler", "Loader", "Assembler"],
      answer: "Kernel",
      explanation: "Kernel manages memory and system resources.",
    },
    {
      question: "Which protocol is used for secure communication?",
      options: ["HTTP", "FTP", "HTTPS", "SMTP"],
      answer: "HTTPS",
      explanation: "HTTPS uses encryption for secure communication.",
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
    <div style={{ fontFamily: "'Inter', sans-serif", color: "#1E293B" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h1 style={{ fontSize: "32px", margin: 0, fontWeight: "700" }}>Technical Practice</h1>
        {testStarted && (
          <p style={{ backgroundColor: "white", padding: "10px 15px", borderRadius: "8px", fontWeight: "bold", margin: 0 }}>
            ⏱️ Time Left: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
          </p>
        )}
      </div>

      {/* Progress Counter */}
      {testStarted && (
        <p style={{ display: "inline-block", backgroundColor: "white", padding: "10px 15px", borderRadius: "8px", marginBottom: "30px", fontSize: "14px", color: "#475569" }}>
          Question <strong>{currentQuestion + 1}</strong> of {questions.length}
        </p>
      )}

      {/* Start Screening Button Wrapper */}
      {!testStarted && (
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "50vh", textAlign: "center" }}>
          <h2 style={{ fontSize: "28px", marginBottom: "10px", fontWeight: "700" }}>Ready to test your technical skills?</h2>
          <p style={{ color: "gray", marginBottom: "25px" }}>{questions.length} Questions • 15 Minutes</p>
          <button onClick={() => setTestStarted(true)} style={{ padding: "14px 30px", backgroundColor: "#2563eb", color: "white", border: "none", borderRadius: "10px", cursor: "pointer", fontWeight: "600" }}>
            Start Test
          </button>
        </div>
      )}

      {/* Active Question Panel Block */}
      {testStarted && (
        <div style={{ backgroundColor: "white", padding: "30px", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
          <h2 style={{ marginBottom: "20px", fontSize: "20px", fontWeight: "600" }}>{current.question}</h2>

          {current.options.map((opt) => (
            <label key={opt} style={{ display: "flex", alignItems: "center", padding: "14px 16px", marginBottom: "10px", borderRadius: "8px", cursor: "pointer", backgroundColor: submitted && opt === current.answer ? "#bbf7d0" : submitted && opt === selected && opt !== current.answer ? "#fecaca" : selected === opt ? "#e0f2fe" : "#f3f4f6" }}>
              <input type="radio" name="answer" value={opt} checked={selected === opt} onChange={() => setSelected(opt)} disabled={submitted} style={{ marginRight: "12px" }} />
              <span>{opt}</span>
            </label>
          ))}

          <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
            <button disabled={!selected || submitted} onClick={() => {
              setSubmitted(true);
              if (selected === current.answer) setScore((prev) => prev + 1);
              if (currentQuestion === questions.length - 1) setTestCompleted(true);
            }} style={{ padding: "12px 20px", backgroundColor: "#2563eb", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "600" }}>
              Submit
            </button>

            {submitted && currentQuestion < questions.length - 1 && (
              <button onClick={() => { setCurrentQuestion(currentQuestion + 1); setSelected(""); setSubmitted(false); }} style={{ padding: "12px 20px", backgroundColor: "#16a34a", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "600" }}>
                Next Question
              </button>
            )}

            {submitted && currentQuestion === questions.length - 1 && (
              <button onClick={() => {
                const resultData = { type: "technical", score: score, total: questions.length };
                fetch("http://localhost:5000/api/results", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(resultData),
                })
                .then(() => setShowResult(true))
                .catch((err) => {
                  console.error(err);
                  setShowResult(true);
                });
              }} style={{ padding: "12px 20px", backgroundColor: "#dc2626", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "600" }}>
                End Exam
              </button>
            )}
          </div>

          {/* Explanation Section */}
          {submitted && (
            <div style={{ marginTop: "20px", padding: "15px", backgroundColor: "#f8fafc", borderRadius: "8px", borderLeft: "4px solid #3b82f6" }}>
              <h3 style={{ margin: "0 0 5px 0", fontSize: "15px", color: "#1e3a8a" }}>Explanation</h3>
              <p style={{ margin: 0, color: "#334155" }}>{current.explanation}</p>
            </div>
          )}
        </div>
      )}

      {/* Result Backdrop Modal View */}
      {showResult && (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", backgroundColor: "rgba(15, 23, 42, 0.4)", display: "flex", justifyContent: "center", alignItems: "center", backdropFilter: "blur(5px)", zIndex: 1000 }}>
          <div style={{ backgroundColor: "white", padding: "40px", borderRadius: "16px", width: "400px", textAlign: "center" }}>
            <h2 style={{ margin: "0 0 10px 0" }}>Test Completed 🎉</h2>
            <h1 style={{ fontSize: "36px", margin: "10px 0", color: "#2563eb" }}>{score} / {questions.length}</h1>
            <p style={{ color: "#64748b" }}>Good work. Keep practicing.</p>
            <div style={{ marginTop: "24px", display: "flex", justifyContent: "center", gap: "10px" }}>
              <button onClick={() => window.location.reload()} style={{ padding: "10px 16px", borderRadius: "8px", border: "1px solid #cbd5e1", cursor: "pointer" }}>Retry</button>
              <button onClick={() => navigate("/dashboard")} style={{ padding: "10px 16px", backgroundColor: "#2563eb", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "600" }}>Dashboard</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Technical;
