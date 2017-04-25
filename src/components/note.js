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
     this.setState({ isEditing: null });
   }

   deleteNote(event) {
     this.props.update('delete', this.props.id, null);
   }

   handleDrag(event, ui) {
     if (ui.y > 50 && ui.x > 50) {
       this.props.update('drag', this.props.id, ui);
     }
   }

   editToggled(event) {
     if (!this.state.isEditing) {
       this.setState({
         isEditing: true,
         newTitle: this.props.note.title,
         newContent: this.props.note.content,
       });
       this.props.update('editor', this.props.id, this.props.user);
     } else if (this.state.newTitle !== '') {
       this.setContent(event);
       this.props.update('editor', this.props.id, '');
     }
   }

   cancelClicked(event) {
     this.setState({ isEditing: false });
     this.props.update('editor', this.props.id, '');
   }

   renderContent() {
     if (this.props.note.editor === this.props.user) {
       return (
         <div className="container" style={{ position: 'absolute' }}>
           <div className="header">
             <div className="header-left">
               <input onChange={this.onTitleInputChange} value={this.state.newTitle} />
               <i onClick={this.editToggled} className="fa fa-check" />
               <i onClick={this.cancelClicked} className="fa fa-close" />
             </div>
             <i className="dragButton fa fa-arrows-alt" />
           </div>
           <div className="content">
             <textarea onChange={this.onInputChange} value={this.state.newContent} />
           </div>
         </div>
       );
     } else if (this.props.note.editor === '') {
       return (
         <div className="container" style={{ position: 'absolute' }}>
           <div className="header">
             <div className="header-left">
               <p>{this.props.note.title}</p>
               <i onClick={this.editToggled} className="fa fa-pencil" />
               <i onClick={this.deleteNote} className="fa fa-trash-o" />
             </div>
             <i className="drag fa fa-arrows-alt" />
           </div>
           <div className="content">
             <div className="noteBody" dangerouslySetInnerHTML={{ __html: marked(this.props.note.content || '') }} />
           </div>
         </div>
       );
     } else {
       return (
         <div className="container" style={{ position: 'absolute' }}>
           <div className="header">
             <div className="header-left">
               <p>{this.props.note.title}</p>
               <i className="fa fa-lock tooltip" />
               <p className="tooltip-text" style={{ top: -50, left: 0 }}>{this.props.note.editor} is editing.</p>
             </div>
             <i className="drag fa fa-arrows-alt" />
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
         handle=".drag"
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
