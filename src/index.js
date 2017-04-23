import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Immutable from 'immutable';
import AddBar from './components/add_bar';
import Note from './components/note';
// import * as firebasedb from './firebasedb';
import './style.scss';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: Immutable.Map(),
      counter: 5,
    };
  }

  // componentDidMount() {
  //   firebasedb.fetchNotes((notes) => {
  //     this.setState({ notes: Immutable.Map(notes) });
  //   });
  // }

  makeNote(title) {
    this.setState({
      notes: this.state.notes.set(this.state.counter,
        {
          title,
          content: '',
          x: Math.floor(Math.random() * (600 - 50)) + 50,
          y: Math.floor(Math.random() * (300 - 50)) + 50,
        }),
      counter: this.state.counter + 1,
    });
  }

  update(type, id, change) {
    if (type === 'delete') {
      // firebasedb.removeNote(id);
      this.setState({
        notes: this.state.notes.delete(id),
      });
    } else if (type === 'drag') {
      this.setState({
        notes: this.state.notes.update(id, (n) => {
          return Object.assign({}, n, { x: change.x, y: change.y });
        }),
      });
    } else if (type === 'edit') {
      this.setState({
        notes: this.state.notes.update(id, (n) => {
          return Object.assign({}, n, { title: change[0], content: change[1] });
        }),
      });
    }
  }

  render() {
    return (
      <div>
        <div>
          <AddBar onAddChange={text => this.makeNote(text)} />
        </div>
        <div id="note-area">
          {this.state.notes.entrySeq().map(([id, note]) => {
            return <Note id={id} note={note} update={(type, key, pos) => this.update(type, key, pos)} />;
          })}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('main'));
