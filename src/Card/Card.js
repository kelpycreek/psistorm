import React, { Component } from 'react';
import './Card.css';


class Card extends Component {
  static defaultProps = {
    id: 'Loading',
    short: '...',
    long: 'You shouldnt see this for very long :)',
    onSelect: null
  }
  
  renderSelectButton = () => {
    return this.props.onSelect ? (
    <button className="Card__SelectButton" onClick={this.props.onSelect}>Select</button>
    ) : null
  }
  
  render() {
    return (
      <div className="Card">
        <div className="Card__Container">
          <h2><b>{this.props.id}</b></h2>
          <div className="Card__ShortDescription">{this.props.short}</div>
          <div className="Card__LongDescription">{this.props.long}</div>
          {this.renderSelectButton()}
        </div>
      </div>
    );
  }
}

export default Card;
