import React, { useState, useEffect } from 'react';
import QuestionForm from './QuestionForm'
import QuestionList from './QuestionList'
import AdminNavbar from './AdminNavBar'

function App() {
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    fetch('http://localhost:4000/questions')
      .then((response) => response.json())
      .then((data) => setQuestions(data))
      .catch((error) => console.error('Error fetching questions:', error));
  }, []);

  
  function handleNewQuestionAdded(newQuestion) {
    setQuestions((prevQuestions) => [...prevQuestions, newQuestion]);
  }

  
  function handleDeleteQuestion(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setQuestions((prevQuestions) => prevQuestions.filter((question) => question.id !== id));
      })
      .catch((error) => {
        console.error('Error deleting question:', error);
      });
  }

  
  function handleCorrectAnswerChange(id, newIndex) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ correctIndex: newIndex }),
    })
      .then(() => {
        setQuestions((prevQuestions) =>
          prevQuestions.map((question) =>
            question.id === id ? { ...question, correctIndex: newIndex } : question
          )
        );
      })
  }

  return (
    <div>
      <AdminNavbar />
      <QuestionForm onQuestionAdded={handleNewQuestionAdded} />
      <QuestionList
        questions={questions}
        onDelete={handleDeleteQuestion}
        onCorrectAnswerChange={handleCorrectAnswerChange}
      />
    </div>
  );
}

export default App;

