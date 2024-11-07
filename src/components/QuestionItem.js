import React from "react";

function QuestionItem({ question, onDelete, onCorrectAnswerChange }) {
  const { id, prompt, answers, correctIndex } = question;

  // Generate options for the correct answer dropdown
  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function handleDelete() {
    onDelete(id); // Call the onDelete function passed from the parent component
  }

  function handleCorrectAnswerChange(event) {
    const newIndex = parseInt(event.target.value, 10);
    onCorrectAnswerChange(id, newIndex); // Call onCorrectAnswerChange with the updated correctIndex
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select value={correctIndex} onChange={handleCorrectAnswerChange}>
          {options}
        </select>
      </label>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;

