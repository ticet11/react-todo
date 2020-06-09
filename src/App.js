// TODO: markComplete to toggleComplete

import React, { Component } from "react";
import { v4 as uuid } from "uuid";
import { BrowserRouter as Router, Route } from "react-router-dom";

import About from "./components/pages/About";
import AddTodo from "./components/AddTodo";
import Header from "./components/layout/Header";
import Todos from "./components/Todos";
import "./App.css";

class App extends Component {
    state = {
        todos: [
            {
                id: uuid(),
                title: "Check the box on the left to toggle completion of this item.",
                completed: false,
            },
            {
                id: uuid(),
                title: "Hit the x on the right to delete this item."
            }
        ],
    };

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
        this.setState({
            todos: [
                ...this.state.todos.filter((item) => item.id !== id),
            ],
        });
    };

    // Add todo item
    addTodo = (title) => {
        const newTodo = {
            id: uuid(),
            title,
            completed: false,
        };
        this.setState({
            todos: [...this.state.todos, newTodo],
        });
    };

    render() {
        return (
            <Router>
                <div className="App">
                    <div className="container">
                        <Header />
                        <Route
                            exact
                            path="/projects/todoapp"
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
                        <Route path="/projects/todoapp/about" component={About} />
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;
