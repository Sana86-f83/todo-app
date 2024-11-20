"use client";
import { useState } from "react";
import { ImBin } from "react-icons/im";
import { FaCheckCircle } from "react-icons/fa";
import { FaTimesCircle } from "react-icons/fa";

export default function Home() {
  let [todolist, setTodoList] = useState<string[]>([]);

  let saveToDoList = (event: any) => {
    let todoName = event.target.todoName.value;

    if (todoName && !todolist.includes(todoName)) {
      setTodoList([...todolist, todoName]);
      event.target.todoName.value = ""; // Clear the input field
    } else if (todolist.includes(todoName)) {
      alert("Todo name already exists. Please enter a different name.");
    }
    event.preventDefault(); // // prevent form from refreshing the page.
  };
  let list = todolist.map((value, index) => {
    return (
      <ToDolistItems
        value={value}
        key={index}
        indexNumber={index}
        todolist={todolist}
        setTodoList={setTodoList}
      />
    );
  });
  return (
    <div
      className="container"
      style={{
        backgroundImage: `url("/background.jpg")`,
        backgroundSize: "cover", // Adjusts image to cover entire div
        backgroundPosition: "center", // Centers the image
        width: "100%",
        height: "100vh", // Adjust height as needed
      }}
    >
      <h1>My TO Do App</h1>
      <form onSubmit={saveToDoList}>
        <input type="text" name="todoName" placeholder="Enter your task!" />
        <button>Edit</button>
      </form>
      <div className="outerDiv">
        <ul>{list}</ul>
      </div>
    </div>
  );
}
function ToDolistItems({ value, indexNumber, todolist, setTodoList }: any) {
  let [status, setStatus] = useState(false);
  // console.log(status);

  let deleteRow = () => {
    let finallist = todolist.filter((v: string, i: number) => i != indexNumber);
    setTodoList(finallist);
  };
  // Function to mark the task as complete
  let markComplete = () => {
    setStatus(true);
  };

  // Function to mark the task as incomplete
  let markIncomplete = () => {
    setStatus(false);
  };

  return (
    <li // This will show on hover
      className={status ? "completetodo" : ""}
    >
      {indexNumber + 1} {value} {/* Display message based on the status */}
      {status ? (
        <span
          style={{ color: "green", marginRight: "100px", marginTop: "-6px", fontWeight:"bolder" }}
        >
          Task Complete
        </span>
      ) : (
        <span style={{ color: "red", marginRight: "100px", marginTop: "-6px", fontWeight:"bolder"}}>
          Task Incomplete
        </span>
      )}
      <span
        onClick={deleteRow}
        style={{ marginLeft: "10px", cursor: "pointer" }}
      >
        <ImBin />
      </span>
      <span
        onClick={markComplete} // Clicking the tick icon will toggle the status
        style={{ marginRight: "35px", cursor: "pointer" }}
      >
        <FaCheckCircle />
      </span>
      <span
        onClick={markIncomplete} // Clicking the tick icon will toggle the status
        style={{ marginRight: "67px", cursor: "pointer" }}
      >
        <FaTimesCircle />
      </span>
    </li>
  );
}
