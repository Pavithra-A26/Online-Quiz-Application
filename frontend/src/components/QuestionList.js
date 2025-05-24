import React, { useEffect, useState } from 'react'
import API from '../api';

function QuestionList () {

    const [questions,setQuestions] = useState([]);

    useEffect(() => {
        API.get('/questions')
            .then(res => setQuestions(res.data))
            .catch(err => console.log(err));
    },[]);

  return (
    <>
        <div>
            <h2>All Questions</h2>
            <ul>
                {questions.map(q => (
                    <li key={q.id}>
                        <strong>{q.questionText}</strong>
                        <ul>
                            <li>A : {q.optionA}</li>
                            <li>B : {q.optionB}</li>
                            <li>C : {q.optionC}</li>
                            <li>D : {q.optionD}</li>
                            <li>Correct : {q.correctOption}</li>
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    </>
  )
}

export default QuestionList;

