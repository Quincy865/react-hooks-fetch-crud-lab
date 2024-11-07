import React, { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([]);

  // Fetch questions from the server when the component mounts
  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((response) => response.json())
      .then((data) => setQuestions(data))
      .catch((error) => console.error("Error fetching questions:", error));
  }, []);

  // Function to delete a question
  function handleDelete(id) {
    // Send DELETE request to the server
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        // Update the state to remove the deleted question
        setQuestions((prevQuestions) =>
          prevQuestions.filter((question) => question.id !== id)
        );
      })
      .catch((error) => console.error("Error deleting question:", error));
  }

  // Function to handle updating the correct answer index
  function handleCorrectAnswerChange(id, newIndex) {
    const updatedQuestion = { correctIndex: newIndex };

    // Send PATCH request to update the correct answer on the server
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedQuestion),
    })
      .then((response) => response.json())
      .then((data) => {
        // Update the state to reflect the updated correctIndex
        setQuestions((prevQuestions) =>
          prevQuestions.map((question) =>
            question.id === id ? { ...question, correctIndex: newIndex } : question
          )
        );
      })
      .catch((error) => console.error("Error updating correct answer:", error));
  }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map((question) => (
          <QuestionItem
            key={question.id}
            question={question}
            onDelete={handleDelete}
            onCorrectAnswerChange={handleCorrectAnswerChange}
          />
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;
