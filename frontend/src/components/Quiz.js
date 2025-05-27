import { useEffect, useState } from "react";
import API from "../api";

function Quiz({ username }) {
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [score, setScore] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [selectedTest, setSelectedTest] = useState("");
    const [feedback, setFeedback] = useState({});

    useEffect(() => {
        if (selectedTest) {
            API.get(`/questions/${selectedTest}`)
                .then(res => {
                    setQuestions(res.data);
                    setAnswers({});
                    setScore(null);
                    setSubmitted(false);
                    setFeedback({});
                })
                .catch(err => console.log(err));
        }
    }, [selectedTest]);

    const handleChange = (qid, selected) => {
        setAnswers(prev => ({ ...prev, [qid]: selected }));
    };

    const handleSubmit = () => {
        if (Object.keys(answers).length !== questions.length) {
            alert("Please answer all questions before submitting.");
            return;
        }

        let correct = 0;
        const feedbackMap = {};

        questions.forEach(q => {
            const userAnswer = answers[q.id];
            const correctAnswer = q[q.correctOption]; // correctOption is key: optionA, etc.

            if (userAnswer === correctAnswer) {
                correct++;
                feedbackMap[q.id] = "correct";
            } else {
                feedbackMap[q.id] = "wrong";
            }
        });

        const result = {
            username,
            totalQuestions: questions.length,
            correctAnswers: correct,
            score: correct * 10
        };

        API.post("/submit", result)
            .then(() => {
                setScore(result.score);
                setFeedback(feedbackMap);
                setSubmitted(true);
                alert("Result submitted!");
            })
            .catch(err => console.log(err));
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>📝 Take a Quiz</h2>

            <label style={styles.selectLabel}>
                Select Test Module:&nbsp;
                <select
                    style={styles.select}
                    value={selectedTest}
                    onChange={(e) => setSelectedTest(e.target.value)}
                >
                    <option value="">-- Choose a Test --</option>
                    <option value="test1">Test 1</option>
                    <option value="test2">Test 2</option>
                </select>
            </label>

            {selectedTest && questions.length > 0 && (
                <div>
                    {questions.map(q => (
                        <div key={q.id} style={styles.questionBox}>
                            <p style={styles.questionText}>{q.questionText}</p>
                            <div>
                                {["optionA", "optionB", "optionC", "optionD"].map(opt => {
                                    const optionValue = q[opt];
                                    const isSelected = answers[q.id] === optionValue;
                                    const isCorrect = q[q.correctOption] === optionValue;

                                    let backgroundColor = "";
                                    if (submitted && isSelected) {
                                        backgroundColor = isCorrect ? "#d4edda" : "#f8d7da";
                                    }

                                    return (
                                        <label
                                            key={opt}
                                            style={{
                                                ...styles.optionLabel,
                                                backgroundColor,
                                                cursor: submitted ? "not-allowed" : "pointer"
                                            }}
                                        >
                                            <input
                                                type="radio"
                                                name={q.id}
                                                value={optionValue}
                                                checked={isSelected}
                                                onChange={() => handleChange(q.id, optionValue)}
                                                disabled={submitted}
                                                style={{ marginRight: "10px" }}
                                            />
                                            {optionValue}
                                        </label>
                                    );
                                })}
                            </div>

                            {submitted && (
                                <p style={{
                                    marginTop: "8px",
                                    fontWeight: "bold",
                                    color: feedback[q.id] === "correct" ? "green" : "red"
                                }}>
                                    {feedback[q.id] === "correct"
                                        ? "✅ Correct"
                                        : `❌ Wrong (Correct: ${q[q.correctOption]})`}
                                </p>
                            )}
                        </div>
                    ))}

                    <button
                        onClick={handleSubmit}
                        disabled={submitted}
                        style={{
                            ...styles.submitButton,
                            backgroundColor: submitted ? "#ccc" : "#4CAF50",
                            cursor: submitted ? "not-allowed" : "pointer"
                        }}
                    >
                        Submit
                    </button>

                    {score !== null && (
                        <h3 style={styles.score}>🎯 Your Score: {score}</h3>
                    )}
                </div>
            )}
        </div>
    );
}

const styles = {
    container: {
        maxWidth: "800px",
        margin: "30px auto",
        padding: "20px",
        background: "#fdfdfd",
        borderRadius: "10px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
    },
    heading: {
        textAlign: "center",
        color: "#333",
        marginBottom: "25px"
    },
    selectLabel: {
        fontSize: "16px",
        display: "block",
        marginBottom: "20px",
        fontWeight: "bold"
    },
    select: {
        padding: "8px 12px",
        fontSize: "16px",
        borderRadius: "6px",
        border: "1px solid #ccc",
        marginLeft: "10px"
    },
    questionBox: {
        border: "1px solid #ddd",
        padding: "15px",
        marginBottom: "20px",
        borderRadius: "10px",
        backgroundColor: "#fff"
    },
    questionText: {
        fontWeight: "bold",
        fontSize: "17px",
        marginBottom: "10px"
    },
    optionLabel: {
        display: "block",
        padding: "8px 12px",
        margin: "5px 0",
        borderRadius: "5px",
        transition: "background 0.3s"
    },
    submitButton: {
        marginTop: "20px",
        padding: "10px 20px",
        fontSize: "16px",
        color: "white",
        border: "none",
        borderRadius: "6px"
    },
    score: {
        textAlign: "center",
        marginTop: "30px",
        fontSize: "20px",
        color: "#333"
    }
};

export default Quiz;
