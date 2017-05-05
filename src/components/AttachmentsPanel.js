import React from 'react';
import PropTypes from 'prop-types';
import { AttachmentView } from './AttachmentView';


export class AttachmentsPanel extends React.Component {
  static propTypes = {
    operations: PropTypes.array,
  }

  constructor(props) {
    super(props);
    this.state = {
      attachments: [],
      operations: this.props.operations,
      isSane: true
    };
  }

  updateAttachments = (attachment, operationName) => {
    const attachments = this.state.attachments
    attachments[operationName] = attachment
    this.setState({attachments});
  }

  componentWillReceiveProps(nextProps) {

    if (!nextProps.operations) {
      this.setState({isSane: isSane});
      return;
    }
    
    let isSane = true
    nextProps.operations.forEach( (operation) => {
      if (!operation.name) {
        return isSane = false;
      }
    })

    if (!isSane) {
      this.setState({isSane: isSane});
      return;
    }

    let operationNames = nextProps.operations.map( (operation) => {
      return operation.name.value  
    })

    const uniqueArray = operationNames.filter((elem, pos, arr) => {
        return arr.indexOf(elem) == pos;
    });

    if (uniqueArray.length != operationNames.length) {
      this.setState({isSane: false});
      return;
    }

    this.setState({operations: nextProps.operations, isSane: true}) 
  }

  render() {

    if (!this.state.isSane) {
      return <div>Check your queries and mutations</div>
    }

    let operations = this.state.operations
    if (!operations) {
      operations = []
    }

    const operationNodes = operations.map((operation, i) => {

      let attachments = this.state.attachments[operation.name.value];
        if (!attachments) {
           attachments = []
        }
      return (
        <AttachmentView key={i} operation={operation} attachments={attachments} updateAttachments={this.updateAttachments}/>
      );
    });
    return (
      <div>
        <div className="history-title-bar">
          <div className="history-title">{'Attachments'}</div>
          <div className="doc-explorer-rhs">
            {this.props.children}
          </div>
        </div>
        <div className="history-contents">
          {operationNodes}
        </div>
      </div>
    );
  }
  
}
