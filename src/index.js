import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Immutable from 'immutable';
import io from 'socket.io-client';
import AddBar from './components/add_bar';
import Note from './components/note';
// import * as firebasedb from './firebasedb';
import './style.scss';

// const socketserver = 'http://localhost:9090';
const socketserver = 'https://react-notes-backend.herokuapp.com/';

class App extends Component {
  constructor(props) {
    super(props);

    this.socket = io(socketserver);
    this.socket.on('connect', () => { console.log('socket.io connected'); });
    this.socket.on('disconnect', () => { console.log('socket.io disconnected'); });
    this.socket.on('reconnect', () => { console.log('socket.io reconnected'); });
    this.socket.on('error', (error) => { console.log(error); });

    this.state = {
      notes: Immutable.Map(),
      username: '',
    };
  }

  componentDidMount() {
    // firebasedb.fetchNotes((notes) => {
    this.socket.on('notes', (notes) => {
      this.setState({ notes: Immutable.Map(notes) });
    });
    // firebasedb.fetchUsers((users) => {
    this.socket.on('users', (users) => {
      this.setState({ users: Immutable.Map(users) });
    });
    fetch('https://animal-namer-api.herokuapp.com/api/name')
    .then(resp => resp.json())
    .then((data) => {
      this.setState({ username: data.name });
    });
  }

  makeNote(title) {
    // firebasedb.createNote(title);
    this.socket.emit('createNote', title);
  }

  deleteNote(id) {
    // firebasedb.removeNote(id);
    this.socket.emit('deleteNote', id);
  }

  update(id, fields) {
    this.socket.emit('updateNote', id, fields);
    // firebasedb.updateNote(id, fields);
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
            return <Note id={id} note={note} delete={key => this.deleteNote(key)} update={(key, fields) => this.update(key, fields)} user={this.state.username} />;
          })}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('main'));
