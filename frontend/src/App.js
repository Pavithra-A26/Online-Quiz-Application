// import logo from './logo.svg';
import './App.css';
import QuestionList from './components/QuestionList';
import AddQuestion from './components/AddQuestion';

function App() {
  return (
    <div>
      <h1>Online Quiz App</h1>
      <AddQuestion />
      <hr />
      <QuestionList />
    </div>
  );
}

export default App;
