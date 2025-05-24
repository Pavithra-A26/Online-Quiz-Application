import { useState } from "react";
import API from "../api";


function AddQuestion(){
    const[formData,setFormData] = useState({
        questionText: '',
        optionA: '',
        optionB: '',
        optionC: '',
        optionD: '',
        correctOption: ''
    });

    const handleChange = e => {
        setFormData({...formData,[e.target.name]: e.target.value});
    };

    const handleSubmit = e => {
        e.preventDefault();
        API.post('/questions',formData)
            .then(res => alert('Question added!'))
            .catch(err => console.log(err));
    };

    return(
        <div>
            <h2>Add New Question</h2>
            <form onSubmit={handleSubmit}>
                <input name="questionText" placeholder="Question" onChange={handleChange} required />
                <input name="optionA" placeholder="Option A" onChange={handleChange} required />
                <input name="optionB" placeholder="Option B" onChange={handleChange} required />
                <input name="optionC" placeholder="Option C" onChange={handleChange} required />
                <input name="optionD" placeholder="Option D" onChange={handleChange} required />
                <input name="correctOption" placeholder="Correct Option" onChange={handleChange} required />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default AddQuestion;