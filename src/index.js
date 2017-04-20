import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Immutable from 'immutable';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: Immutable.Map(),
    };
  }

}

ReactDOM.render(<App />, document.getElementById('main'));
