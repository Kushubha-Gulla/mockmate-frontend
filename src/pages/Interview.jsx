import { useState } from "react";

function Interview() {
  const questions = [
    {
      question: "Tell me about yourself.",
      sample: "Start with education, skills, projects, and career goal in 1–2 minutes.",
    },
    {
      question: "Why should we hire you?",
      sample: "Mention your strengths, skills, and how you add value to the company.",
    },
    {
      question: "Explain your final year project.",
      sample: "Explain problem → solution → tech stack → your role → outcome.",
    },
  ];

  const [testStarted, setTestStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answer, setAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const current = questions[currentQuestion];

  return (
    <div>
      {/* HEADER */}
      <h1 style={{ fontSize: "32px", marginBottom: "20px", fontFamily: "'Inter', sans-serif" }}>
        Interview Practice
      </h1>

      {/* START SCREEN */}
      {!testStarted && (
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "50vh", textAlign: "center", fontFamily: "'Inter', sans-serif" }}>
          <h2>Prepare for Real Interviews 🎤</h2>
          <p style={{ color: "gray", marginTop: "5px" }}>
            HR + Behavioral Questions • Improve your communication
          </p>

          <button
            onClick={() => setTestStarted(true)}
            style={{
              marginTop: "20px",
              padding: "14px 30px",
              backgroundColor: "#2563eb",
              color: "white",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: "600"
            }}
          >
            Start Interview Practice
          </button>
        </div>
      )}

      {/* QUESTION SCREEN */}
      {testStarted && (
        <div style={{ background: "white", padding: "30px", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)", fontFamily: "'Inter', sans-serif" }}>
          <h3 style={{ fontSize: "20px", marginBottom: "15px" }}>
            Q{currentQuestion + 1}. {current.question}
          </h3>

          <textarea
            rows="6"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Type your answer here..."
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #cbd5e1",
              fontSize: "15px",
              fontFamily: "inherit"
            }}
          />

          <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
            <button
              onClick={() => setSubmitted(true)}
              disabled={!answer || submitted}
              style={{
                padding: "10px 18px",
                background: "#2563eb",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: !answer || submitted ? "not-allowed" : "pointer",
                opacity: !answer || submitted ? 0.6 : 1,
                fontWeight: "600"
              }}
            >
              Submit
            </button>

            {/* NEXT BUTTON */}
            {submitted && currentQuestion < questions.length - 1 && (
              <button
                onClick={() => {
                  setCurrentQuestion((p) => p + 1);
                  setAnswer("");
                  setSubmitted(false);
                }}
                style={{
                  padding: "10px 18px",
                  background: "#16a34a",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "600"
                }}
              >
                Next Question
              </button>
            )}

            {/* FINISH BUTTON FOR LAST QUESTION */}
            {submitted && currentQuestion === questions.length - 1 && (
              <button
                onClick={() => {
                  setTestStarted(false);
                  setCurrentQuestion(0);
                  setAnswer("");
                  setSubmitted(false);
                }}
                style={{
                  padding: "10px 18px",
                  background: "#dc2626",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "600"
                }}
              >
                Finish Practice
              </button>
            )}
          </div>

          {/* SAMPLE ANSWER */}
          {submitted && (
            <div style={{ marginTop: "20px", padding: "15px", background: "#f8fafc", borderRadius: "8px", borderLeft: "4px solid #3b82f6" }}>
              <h4 style={{ margin: "0 0 5px 0", color: "#1e3a8a" }}>💡 Sample Answer Guidelines</h4>
              <p style={{ margin: 0, color: "#334155", fontSize: "14.5px" }}>{current.sample}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Interview;
