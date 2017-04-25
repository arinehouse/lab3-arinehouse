import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Immutable from 'immutable';
import AddBar from './components/add_bar';
import Note from './components/note';
import * as firebasedb from './firebasedb';
import './style.scss';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: Immutable.Map(),
      username: '',
    };
  }

  componentDidMount() {
    firebasedb.fetchNotes((notes) => {
      this.setState({ notes: Immutable.Map(notes) });
    });
    firebasedb.fetchUsers((users) => {
      this.setState({ users: Immutable.Map(users) });
    });
    fetch('https://animal-namer-api.herokuapp.com/api/name')
    .then(resp => resp.json())
    .then((data) => {
      this.setState({ username: data.name });
    });
  }

  makeNote(title) {
    firebasedb.createNote(title);
  }

  update(type, id, change) {
    if (type === 'delete') {
      firebasedb.removeNote(id);
    } else if (type === 'drag') {
      firebasedb.dragNote(id, change);
    } else if (type === 'edit') {
      firebasedb.editNote(id, change);
    } else if (type === 'editor') {
      firebasedb.changeEditor(id, change);
    }
  }

  render() {
    return (
      <div>
        <div>
          <AddBar onAddChange={text => this.makeNote(text)} />
        </div>
        <div id="name-display">
          Currently logged in as: {this.state.username}
        </div>
        <div id="note-area">
          {this.state.notes.entrySeq().map(([id, note]) => {
            return <Note id={id} note={note} update={(type, key, pos) => this.update(type, key, pos)} user={this.state.username} />;
          })}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('main'));
