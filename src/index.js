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
    };
  }

  componentDidMount() {
    firebasedb.fetchNotes((notes) => {
      this.setState({ notes: Immutable.Map(notes) });
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
