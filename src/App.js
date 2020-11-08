import React from 'react';

import CreateTaskForm from './components/CreateTaskForm';
import Header from './components/Header';
import TaskList from './components/TaskList';

import './App.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasksById: {},
      sortedTasks: [],
      unassignedPriorities: [],
      nextTaskId: 1,
    };

    this.createTask = this.createTask.bind(this);
    this.toggleTaskComplete = this.toggleTaskComplete.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
  }

  createTask({ description, priority }) {
    const id = this.state.nextTaskId;
    const newTask = {
      id,
      description,
      priority,
      completed: false
    };

    this.updateTasks({
      ...this.state.tasksById,
      [id]: newTask
    });

    this.setState({
      nextTaskId: id + 1,
    });
  }

  updateTasks(newTasksById) {
    this.setState({
      tasksById: newTasksById,
      sortedTasks: getSortedTasks(newTasksById),
      unassignedPriorities: getUnassignedPriorities(newTasksById)
    });
  }

  toggleTaskComplete(taskId) {
    const task = this.state.tasksById[taskId];
    if (!task) {
      return;
    }
    task.completed = !task.completed;

    this.updateTasks({
      ...this.state.tasksById,
      [taskId]: task
    });
  }

  deleteTask(taskId) {
    const newTasksById = { ...this.state.tasksById };
    delete newTasksById[taskId];
    this.updateTasks(newTasksById);
  }

  render() {
    return (
      <div className="container">
        <Header />
        <CreateTaskForm unassignedPriorities={this.state.unassignedPriorities} createTask={this.createTask} />
        <TaskList 
          tasks={this.state.sortedTasks} 
          onToggleTaskComplete={this.toggleTaskComplete}
          onDeleteTask={this.deleteTask} />
      </div>
    );
  }
}

function getSortedTasks(tasksById) {
  return Object.values(tasksById)
    .sort((task1, task2) => task1.priority - task2.priority)
}

function getUnassignedPriorities(tasksById) {
  const minPriority = 1;
  let maxPriority = 1;
  const foundPriorities = {};

  const incompleteTasks = Object.values(tasksById).filter((task) => !task.completed);

  if (incompleteTasks.length === 0) {
    return [];
  }

  for (const task of incompleteTasks) {
    foundPriorities[task.priority] = true;

    if (task.priority > maxPriority) {
      maxPriority = task.priority;
    }
  }

  const unassignedPriorities = [];
  for (let i = minPriority; i <= maxPriority; i++) {
    if (!foundPriorities[i]) {
      unassignedPriorities.push(i);
    }
  }

  return unassignedPriorities;
}