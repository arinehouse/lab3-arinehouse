import React, { Component } from 'react';

class NameInput extends Component {

  constructor(props) {
    super(props);

    this.state = { user: '' };

    this.onUserSubmit = this.onUserSubmit.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange(event) {
    this.setState({ user: event.target.value });
  }

  onUserSubmit(event) {
    event.preventDefault();
    this.props.onNameChange(this.state.user);
    this.setState({ user: '' });
    event.target.reset();
  }

  render() {
    return (
      <div>
        <form id="username" onSubmit={this.onUserSubmit}>
          <input id="namebar" onChange={this.onInputChange} placeholder="What's your name?" />
          <input id="submit-name" type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}


export default NameInput;
