// TODO: markComplete to toggleComplete

import React, { Component } from "react";
// import { v4 as uuid } from "uuid";
import { BrowserRouter as Router, Route } from "react-router-dom";

import About from "./components/pages/About";
import AddTodo from "./components/AddTodo";
import Header from "./components/layout/Header";
import Todos from "./components/Todos";
import "./App.css";
import axios from "axios";

class App extends Component {
    state = {
        todos: [],
    };

    componentDidMount() {
        axios
            .get(
                "https://jsonplaceholder.typicode.com/todos?_limit=10"
            )
            .then((res) => this.setState({ todos: res.data }));
    }

    // Toggle Complete
    markComplete = (id) => {
        this.setState({
            todos: this.state.todos.map((item) => {
                if (item.id === id) {
                    item.completed = !item.completed;
                }
                return item;
            }),
        });
    };

    // Delete Todo
    deleteTodo = (id) => {
        axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
        .then(res =>  this.setState({
            todos: [
                ...this.state.todos.filter((item) => item.id !== id),
            ],
        }))

       
    };

    // Add todo item
    addTodo = (title) => {
        axios
            .post("https://jsonplaceholder.typicode.com/todos", {
                title,
                completed: false,
            })
            .then((res) =>
                this.setState({
                    todos: [...this.state.todos, res.data],
                })
            );
    };

    render() {
        return (
            <Router>
                <div className="App">
                    <div className="container">
                        <Header />
                        <Route
                            exact
                            path="/"
                            render={(props) => (
                                <React.Fragment>
                                    <AddTodo addTodo={this.addTodo} />
                                    <Todos
                                        todos={this.state.todos}
                                        markComplete={
                                            this.markComplete
                                        }
                                        deleteTodo={this.deleteTodo}
                                    />
                                </React.Fragment>
                            )}
                        />
                        <Route path="/about" component={About} />
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;
