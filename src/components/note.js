import React, { Component } from 'react';
import Draggable from 'react-draggable';
import marked from 'marked';

class Note extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
      newContent: '',
      newTitle: '',
    };

    this.deleteNote = this.deleteNote.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
    this.editToggled = this.editToggled.bind(this);
    this.renderContent = this.renderContent.bind(this);
    this.setContent = this.setContent.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onTitleInputChange = this.onTitleInputChange.bind(this);
    this.cancelClicked = this.cancelClicked.bind(this);
  }

  onInputChange(event) {
    this.setState({ newContent: event.target.value });
  }

  onTitleInputChange(event) {
    this.setState({ newTitle: event.target.value });
  }

  setContent(event) {
    this.props.update('edit', this.props.id, [this.state.newTitle, this.state.newContent]);
    this.setState({ isEditing: false });
  }

  deleteNote(event) {
    this.props.update('delete', this.props.id, null);
  }

  handleDrag(event, ui) {
    this.props.update('drag', this.props.id, ui);
  }

  editToggled(event) {
    if (!this.state.isEditing) {
      this.setState({ isEditing: true });
    } else {
      this.setState({ isEditing: false });
      this.setContent(event);
    }
  }

  cancelClicked(event) {
    this.setState({ isEditing: false });
  }

  renderContent() {
    if (this.state.isEditing) {
      return (
        <div className="container" style={{ position: 'absolute' }}>
          <div className="header">
            <div className="header-left">
              <input onChange={this.onTitleInputChange} placeholder={this.props.note.title} />
              <button onClick={this.editToggled}><i className="fa fa-check" /></button>
              <button onClick={this.cancelClicked}><i className="fa fa-close" /></button>
            </div>
            <button className="dragButton"><i className="fa fa-arrows-alt" /></button>
          </div>
          <div className="content">
            <textarea onChange={this.onInputChange} placeholder={this.props.note.content} />
          </div>
        </div>
      );
    } else {
      return (
        <div className="container" style={{ position: 'absolute' }}>
          <div className="header">
            <div className="header-left">
              <p>{this.props.note.title}</p>
              <button onClick={this.editToggled}><i className="fa fa-pencil" /></button>
              <button onClick={this.deleteNote}><i className="fa fa-trash-o" /></button>
            </div>
            <button className="dragButton"><i className="fa fa-arrows-alt" /></button>
          </div>
          <div className="content">
            <div className="noteBody" dangerouslySetInnerHTML={{ __html: marked(this.props.note.content || '') }} />
          </div>
        </div>
      );
    }
  }

  render() {
    return (
      <Draggable
        handle=".dragButton"
        defaultPosition={{ x: 20, y: 20 }}
        position={{ x: this.props.note.x, y: this.props.note.y }}
        onStart={this.handleStart}
        onDrag={this.handleDrag}
        onStop={this.handleStop}
      >
        <div>
          {this.renderContent()}
        </div>
      </Draggable>
    );
  }
}

export default Note;
