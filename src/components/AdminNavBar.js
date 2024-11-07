import React from "react";

function AdminNavBar({ onChangePage, activePage }) {
  return (
    <nav>
      <button
        onClick={() => onChangePage("Form")}
        style={{ fontWeight: activePage === "Form" ? "bold" : "normal" }}
      >
        New Question
      </button>
      <button
        onClick={() => onChangePage("List")}
        style={{ fontWeight: activePage === "List" ? "bold" : "normal" }}
      >
        View Questions
      </button>
    </nav>
  );
}

export default AdminNavBar;

