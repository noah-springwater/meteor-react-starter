import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom'; //added when you add handleSubmit function

import { Tasks } from '../api/tasks.js';

import Task from './Task.jsx';

// App component - represents the whole app
class App extends Component {

 renderTasks() {
    return this.props.tasks.map((task) => (
      <Task key={task._id} task={task} />
    ));
  }

  handleSubmit(e) {
   e.preventDefault();

   // Find the text field via the React ref
   const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

   Tasks.insert({
     text,
     createdAt: new Date(), // current time
   });

   // Clear form
   ReactDOM.findDOMNode(this.refs.textInput).value = '';
 }

  render() {
    return (
      <div className="container">
        <header>
          <h1>Todo List</h1>
        </header>

        <ul>
          {this.renderTasks()}
        </ul>
      </div>
    );
  }
}

App.propTypes = {
  tasks: PropTypes.array.isRequired,
};

export default createContainer(() => {
  return {
    tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
  };
}, App);
