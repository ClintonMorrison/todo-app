import React from 'react';
import TaskRow from './TaskRow';

export default class TaskList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showCompleted: true
    };
    this.onToggleShowCompleted = this.onToggleShowCompleted.bind(this);
  }

  onToggleShowCompleted() {
    this.setState({ showCompleted: !this.state.showCompleted });
  }

  render(props) {
    return (
      <div className="task-list">
        <h2>Tasks</h2>
        <form>
          <label htmlFor="show-completed">
            <input id="show-completed" type="checkbox" checked={this.state.showCompleted} onChange={this.onToggleShowCompleted} />
            <span className="label-body">Show completed tasks</span>
          </label>
        </form>

        {this.props.tasks.length > 0 ? this.renderTaskTable() : this.renderEmptyState()}
      </div>
    );
  }

  renderEmptyState() {
    return (
      <p className="box">
        You have not created any tasks.
      </p>
    )
  }

  renderTaskTable() {
    return (
      <table className="u-full-width">
        <thead>
          <tr>
            <th></th>
            <th>Priority</th>
            <th>Description</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {this.props.tasks
            .filter(task => !task.completed || this.state.showCompleted)
            .map(task => <TaskRow
              key={task.id}
              task={task}
              onToggleComplete={() => this.props.onToggleTaskComplete(task.id)}
              onDelete={() => this.props.onDeleteTask(task.id)} />)}
        </tbody>
      </table>
    );
  }
}