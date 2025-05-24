import { useEffect, useState } from "react";
import API from "../api";


function Quiz({username}){
    const [questions,setQuestions] = useState([]);
    const [answers,setAnswers] = useState({});
    const [score, setscore] = useState(null);

    useEffect(()=>{
        API.get('/questions')
            .then(res => setQuestions(res.data))
            .catch(err => console.log(err));
    },[]);

    const handleChange = (qid,selected) => {
        setAnswers(prev => ({...prev,[qid]: selected}));
    };

    const handleSubmit = () =>{
        let correct =0;
        questions.forEach(q => {
            if(answers[q.id] === q.correctOption){
                correct++;
            }
        });

        const result = {
            username,
            totalQuestions: questions.length,
            correctAnswers: correct,
            score: correct*10
        };

        API.post('/results',result)
            .then(res =>{
                setscore(result.score);
                alert('Result submitted!');
            })
            .catch(err => console.log(err));
    };



    return(
        <div>
            <h2>Quiz</h2>
            {questions.map(q => (
                <div key={q.id}>
                    <p>{q.questionText}</p>
                    <div>
                        {['optionA' ,'optionB','optionC','optionD'].map(opt=>(
                            <label key={opt}>
                                <input
                                    type="radio"
                                    name = {q.id}
                                    value={q[opt]}
                                    cheacked = {answers[q.id] === q[opt]}
                                    onChange = {() => handleChange(q.id,q[opt])}
                                />
                                {q[opt]}
                            </label>
                        ))}
                    </div>
                </div>
            ))}
            <button onClick={handleSubmit}>Submit</button>
            {score !== null && <h3>Your score: {scpre}</h3>}
        </div>
    )
}


export default Quiz;