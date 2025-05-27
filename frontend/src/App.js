import './App.css';
import QuestionList from './components/QuestionList';
import AddQuestion from './components/AddQuestion';
import { useState } from 'react';
import Quiz from './components/Quiz';

function App() {
  const [username, setUsername] = useState('');
  const [startQuiz, setStartQuiz] = useState(false);

  const handleStartQuiz = () => {
    if (!username.trim()) {
      alert('Please enter your name to start the quiz!');
      return;
    }
    setStartQuiz(true);
  };

  const isAdmin = username.trim().toLowerCase() === 'admin';

  const containerStyle = {
    maxWidth: '700px',
    margin: '30px auto',
    padding: '20px',
    backgroundColor: '#f4f4f4',
    borderRadius: '12px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif'
  };

  const inputStyle = {
    padding: '10px',
    width: '60%',
    borderRadius: '5px',
    border: '1px solid #ccc',
    marginRight: '10px'
  };

  const buttonStyle = {
    padding: '10px 20px',
    backgroundColor: '#2ecc71',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold'
  };

  const adminSectionStyle = {
    marginTop: '40px',
    textAlign: 'left'
  };

  return (
    <div className="App" style={containerStyle}>
      <h1 style={{ color: '#2c3e50' }}>Online Quiz App</h1>

      {!startQuiz ? (
        <>
          <div style={{ marginBottom: '20px' }}>
            <input
              type='text'
              placeholder='Enter Your Name'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={inputStyle}
            />
            <button onClick={handleStartQuiz} style={buttonStyle}>
              Start Quiz
            </button>
          </div>

          {isAdmin && (
            <div style={adminSectionStyle}>
              <h2 style={{ color: '#34495e' }}>Admin Panel</h2>
              <AddQuestion />
              <hr style={{ margin: '30px 0' }} />
              <QuestionList />
            </div>
          )}
        </>
      ) : (
        <Quiz username={username} />
      )}
    </div>
  );
}

export default App;
