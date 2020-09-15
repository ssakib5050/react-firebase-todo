import React from "react";
import Todo from "./Todo";

import firebase from "firebase";
import db from "./firebase";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";

import "./App.css";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      todoInput: "",
      todoLoading: false,
      todos: [],
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { todos, todoInput } = this.state;

    if (this.state.todoInput) {
      db.collection("todos").add({
        todo: this.state.todoInput,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    }

    this.setState({
      todoInput: "",
    });
  };

  componentDidMount() {
    db.collection("todos")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        const todos = [];
        snapshot.docs.map((doc) =>
          todos.push({ id: doc.id, todo: doc.data().todo })
        );
        this.setState({ todos: todos });
        this.setState({ todoLoading: true });
      });
  }

  render() {
    return (
      <div className="container">
        <h2 className="container_h2">Todo List!</h2>
        <p className="container_p">A Simple React Todo List App</p>

        <div className="todo_wrap">
          <div>
            <form action="" className="input_wrap" onSubmit={this.handleSubmit}>
              <input
                type="text"
                placeholder="New Todo"
                onChange={(e) => this.setState({ todoInput: e.target.value })}
                value={this.state.todoInput}
              />
              <button className="active">Add Task</button>
            </form>
          </div>

          {!this.state.todos.length ? (
            <div className="main__loading">
              <p className="main__loading_text">
                {!this.state.todoLoading ? "Loading..." : "No Item Found"}
              </p>
            </div>
          ) : (
            this.state.todos.map((todo, index) => (
              <Todo todo={todo.todo} key={index} index={index} id={todo.id} />
            ))
          )}
        </div>
      </div>
    );
  }
}

export default App;
