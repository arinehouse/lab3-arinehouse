import React, { Component } from 'react';

class AddBar extends Component {

  constructor(props) {
    super(props);

    this.state = { notename: '' };

    this.onAddbarSubmit = this.onAddbarSubmit.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange(event) {
    this.setState({ notename: event.target.value });
  }

  onAddbarSubmit(event) {
    event.preventDefault();
    this.props.onAddChange(this.state.notename);
    this.setState({ notename: '' });
    event.target.reset();
  }

  render() {
    return (
      <div>
        <form id="new-note" onSubmit={this.onAddbarSubmit}>
          <input id="addbar" onChange={this.onInputChange} placeholder="Add a note!" />
          <input id="submit" type="submit" value="Add!" />
        </form>
      </div>
    );
  }
}


export default AddBar;
