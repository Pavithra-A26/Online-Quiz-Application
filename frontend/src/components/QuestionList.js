import React, { useEffect, useState } from 'react';
import API from '../api';

function QuestionList() {
    const [questions, setQuestions] = useState([]);
    const [groupedQuestions, setGroupedQuestions] = useState({});

    useEffect(() => {
        API.get('/questions')
            .then(res => {
                setQuestions(res.data);
                groupByModule(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    const groupByModule = (questions) => {
        const grouped = questions.reduce((acc, q) => {
            const module = q.testModule || 'Uncategorized';
            if (!acc[module]) {
                acc[module] = [];
            }
            acc[module].push(q);
            return acc;
        }, {});
        setGroupedQuestions(grouped);
    };

    return (
        <div style={{ padding: '30px', fontFamily: 'Arial, sans-serif' }}>
            <h2 style={{ textAlign: 'center', color: '#333' }}>All Questions by Module</h2>
            {Object.keys(groupedQuestions).map(module => (
                <div
                    key={module}
                    style={{
                        marginBottom: '30px',
                        padding: '20px',
                        border: '1px solid #ccc',
                        borderRadius: '10px',
                        backgroundColor: '#f9f9f9',
                        boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                    }}
                >
                    <h3 style={{ color: '#2c3e50', borderBottom: '1px solid #ddd', paddingBottom: '5px' }}>
                        📘 {module}
                    </h3>
                    <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
                        {groupedQuestions[module].map(q => (
                            <li
                                key={q.id}
                                style={{
                                    marginBottom: '20px',
                                    padding: '15px',
                                    backgroundColor: '#fff',
                                    borderRadius: '8px',
                                    border: '1px solid #ddd'
                                }}
                            >
                                <strong style={{ color: '#34495e' }}>{q.questionText}</strong>
                                <ul style={{ marginTop: '10px' }}>
                                    <li><strong>A:</strong> {q.optionA}</li>
                                    <li><strong>B:</strong> {q.optionB}</li>
                                    <li><strong>C:</strong> {q.optionC}</li>
                                    <li><strong>D:</strong> {q.optionD}</li>
                                    <li><strong>Correct:</strong> {q.correctOption}</li>
                                </ul>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}

export default QuestionList;
