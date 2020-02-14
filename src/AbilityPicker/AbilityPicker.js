import React, { Component } from 'react';
import Modal from 'react-modal';
import Card from '../Card/Card.js'

class AbilityPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: this.props.options && this.props.options.length
    }
  }
  
  static defaultProps = {
    onAbilitySelect: () => {},
    options: []
  }
  
  openModal = () => {
    this.setState({ showModal: true });
  }
  
  closeModal = () => {
    this.setState({ showModal: false });
    this.props.handleAbilitySelect();
  }
  
  render() {
    return (
      <Modal
        isOpen={this.state.showModal}
        contentLabel="Choose your ability"
      >
        <button onClick={this.closeModal}>close</button>
        <div className="ResearchOptions">
          {this.props.options.map((option, index) => {
            return <Card key={option.title} {...option}/>
          })}
        </div>
      </Modal>
    );
  }
}

export default AbilityPicker;
        

