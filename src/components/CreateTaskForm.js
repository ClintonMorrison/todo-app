import React from 'react';

import './CreateTaskForm.css';

const MAX_PRIORITY = 25;
const MIN_PRIORITY = 1;
const priorities = [];

for (let i = MIN_PRIORITY; i <= MAX_PRIORITY; i++) {
  priorities.push(i);
}

export default class CreateTaskForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      priority: 1,
    };

    this.onDescriptionChange = this.onDescriptionChange.bind(this);
    this.onPriorityChange = this.onPriorityChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onDescriptionChange(e) {
    this.setState({ description: e.target.value });
  }

  onPriorityChange(e) {
    this.setState({ priority: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const { description, priority } = this.state;

    if (!description) {
      return;
    }

    this.props.createTask({ description, priority });
    this.setState({ description: '' });
  }

  render() {
    return (
      <form className="create-task-form box">
        <h2>Create Task</h2>
        {this.renderUnassignedPriorities()}
        {this.renderCreateTaskFields()}
        <button className="button-primary" onClick={this.onSubmit}>Create</button>
      </form>
    );
  }

  renderUnassignedPriorities() {
    if (!this.props.unassignedPriorities || this.props.unassignedPriorities.length === 0) {
      return null;
    }

    return (
      <div className="row unassigned-priorities-block">
        <div className="twleve columns">
          <div><strong>Unassigned Priorities:</strong></div>
          <div>{this.props.unassignedPriorities.join(', ')}</div>
        </div>
      </div>
    );
  }

  renderCreateTaskFields() {
    return (
      <div className="row">
        <div className="six columns">
          <label htmlFor="description">Description</label>
          <input
            className="u-full-width"
            type="text"
            placeholder="Task Description"
            id="description"
            onChange={this.onDescriptionChange}
            value={this.state.description} />
        </div>
        <div className="six columns">
          <label htmlFor="priority">Priority</label>
          <select
            className="u-full-width"
            id="priority"
            onChange={this.onPriorityChange}
            value={this.state.priority}>
            {priorities.map(priority =>
              <option
                key={`${priority}-${priority}`}
                value={priority}>{priority}</option>)}
          </select>
        </div>
      </div>
    );
  }

}