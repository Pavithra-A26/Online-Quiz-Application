import { useState } from "react";
import API from "../api";

function AddQuestion() {
    const [formData, setFormData] = useState({
        questionText: '',
        optionA: '',
        optionB: '',
        optionC: '',
        optionD: '',
        correctOption: '',
        testModule: ''
    });

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        if (!formData.testModule) {
            alert("Please select a test module.");
            return;
        }
        API.post('/questions', formData)
            .then(res => {
                alert('Question added!');
                setFormData({
                    questionText: '',
                    optionA: '',
                    optionB: '',
                    optionC: '',
                    optionD: '',
                    correctOption: '',
                    testModule: ''
                });
            })
            .catch(err => console.log(err));
    };

    const formStyle = {
        maxWidth: '500px',
        margin: '30px auto',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '10px',
        backgroundColor: '#f8f8f8',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        fontFamily: 'Arial, sans-serif'
    };

    const inputStyle = {
        width: '100%',
        padding: '10px',
        margin: '10px 0',
        borderRadius: '5px',
        border: '1px solid #ccc'
    };

    const labelStyle = {
        fontWeight: 'bold',
        marginTop: '10px',
        display: 'block'
    };

    const buttonStyle = {
        padding: '10px 20px',
        backgroundColor: '#3498db',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontWeight: 'bold',
        marginTop: '10px'
    };

    return (
        <div style={formStyle}>
            <h2 style={{ textAlign: 'center', color: '#2c3e50' }}>Add New Question</h2>
            <form onSubmit={handleSubmit}>
                <label style={labelStyle}>Question</label>
                <input
                    name="questionText"
                    placeholder="Enter the question"
                    value={formData.questionText}
                    onChange={handleChange}
                    style={inputStyle}
                    required
                />

                <label style={labelStyle}>Option A</label>
                <input
                    name="optionA"
                    placeholder="Option A"
                    value={formData.optionA}
                    onChange={handleChange}
                    style={inputStyle}
                    required
                />

                <label style={labelStyle}>Option B</label>
                <input
                    name="optionB"
                    placeholder="Option B"
                    value={formData.optionB}
                    onChange={handleChange}
                    style={inputStyle}
                    required
                />

                <label style={labelStyle}>Option C</label>
                <input
                    name="optionC"
                    placeholder="Option C"
                    value={formData.optionC}
                    onChange={handleChange}
                    style={inputStyle}
                    required
                />

                <label style={labelStyle}>Option D</label>
                <input
                    name="optionD"
                    placeholder="Option D"
                    value={formData.optionD}
                    onChange={handleChange}
                    style={inputStyle}
                    required
                />

                <label style={labelStyle}>Correct Option (A/B/C/D)</label>
                <input
                    name="correctOption"
                    placeholder="Correct Option"
                    value={formData.correctOption}
                    onChange={handleChange}
                    style={inputStyle}
                    required
                />

                <label style={labelStyle}>Test Module</label>
                <select
                    name="testModule"
                    value={formData.testModule}
                    onChange={handleChange}
                    style={inputStyle}
                    required
                >
                    <option value="">-- Select Test Module --</option>
                    <option value="test1">Test 1</option>
                    <option value="test2">Test 2</option>
                </select>

                <button type="submit" style={buttonStyle}>Submit</button>
            </form>
        </div>
    );
}

export default AddQuestion;
