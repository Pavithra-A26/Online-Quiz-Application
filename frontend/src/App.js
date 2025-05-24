// import logo from './logo.svg';
import './App.css';
import QuestionList from './components/QuestionList';
import AddQuestion from './components/AddQuestion';
import { useState } from 'react';
import Quiz from './components/Quiz';

function App() {
  const [username,setUsername] = useState('');
  const [startQuiz, setStartQuiz] = useState(false);

  const handleStartQuiz = () => {
    if(!username.trim()){
      alert('Please enter your name to start the quiz!');
      return;
    }
    setStartQuiz(true);
  };

  const isAdmin = username.trim().toLowerCase() === 'admin';

  return (
    <div className='App'>
      <h1>Online Quiz App</h1>
      {!startQuiz ? (
        <>
          <div>
            <input 
              type='text'
              placeholder='Enter Your Name'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <button onClick={handleStartQuiz}> Start Quiz</button>
          </div>

          {isAdmin && (
            <> 
              <hr />

              <AddQuestion/>

              <hr />
              <QuestionList/>
            </>
          )}

        </>
      ): (
        <Quiz username={username} />
      )}
    </div>
  );
}

export default App;
