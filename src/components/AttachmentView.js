import React from 'react';
import PropTypes from 'prop-types';

class AddAttachmentItem extends React.Component {
  constructor(props) {
    super(props)
  }

  addAttachment = (event) => {

    
    const files = this.fileInput.files
    if (files.length > 0) {
      const fieldName = this.keyNameInput.value || files[0].name.split('.', 1)[0]
      this.props.onAdd(fieldName, files[0])
      this.fileInput.value = null
      this.keyNameInput.value = null
    }

  }

  render = () => {
    return (
      <div className='add-attachment-container'>
          <input type="text" placeholder="Field Name"
          ref={(input) => { this.keyNameInput = input; }}
          />
          <input type="file" ref={(input) => { this.fileInput = input; }}/>
          <button onClick={this.addAttachment} >Add</button>
      </div>
    );
    
  }
}

class AttachmentItem extends React.Component {
  
  constructor(props) {
    super(props)
  }

  render = () => {
    return (
      <div style={{ display:'flex', justifyContent: 'space-around'}}>
        <div>
          <div>{this.props.item.fieldName}</div>
          <div>{this.props.item.file.name}</div>
        </div>
        <div className="docExplorerHide" style={{ color:'red'}} onClick={this.handleAttachments}>
              {'\u2715'}
            </div>
       </div>
    );
  }
}

export class AttachmentView extends React.Component {
  static propTypes = {
    operation: PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.state = {
      operation: this.props.operation,
      attachments: this.props.attachments
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({operation: nextProps.operation, attachments: nextProps.attachments}) 
  }

  onAdd = (fieldName,file) => {

    const attachments = this.state.attachments
    attachments.push({ fieldName, file, id: attachments.length+1})

    this.setState({ attachments });
    this.props.updateAttachments(attachments, this.state.operation.name.value)
    
  }

  render() {

    let attachments = this.state.attachments.map( (attachment) => {
      return <AttachmentItem item={attachment} key={attachment.id+"_key"} />;
    })
    let operationName = this.state.operation != undefined ? this.state.operation.name.value : "";
    return (
      <div>
        <h3 style={{ color: 'white', backgroundColor: 'black', padding: '5px'}}>{operationName}</h3>
          <AddAttachmentItem onAdd={this.onAdd}/>
          {attachments}
      </div>
    );
  }
}



