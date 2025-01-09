import { Component } from "react";

class AddToList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      todoList: []
    };
  }

  componentDidMount() {
    console.log('Component has mounted');
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.todoList !== this.state.todoList) {
      console.log('Todo list updated:', this.state.todoList);
    }
  }

  componentWillUnmount() {
    console.log('Component will unmount');
  }

  addToList = () => {
    const { text, todoList } = this.state;
    if (text.trim() !== '') {
      this.setState({
        todoList: [text, ...todoList],
        text: ''
      });
    }
  }

  deleteItem = (item) => {
    this.setState({ todoList: this.state.todoList.filter(todo => todo !== item) });
  };

  handleChange = (e) => {
    this.setState({ text: e.target.value });
  };

  render() {
    const { text, todoList } = this.state;

    return (
      <div>
        <input
          type='text'
          name='todoList'
          value={text}
          onChange={this.handleChange}
        />
        <button onClick={this.addToList}>Add</button>

        <ul>
          {todoList.map((item, index) => (
            <li key={index}>
              {item} 
              <button onClick={() => this.deleteItem(item)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div>
        <AddToList />
      </div>
    );
  }
}

export default App;
