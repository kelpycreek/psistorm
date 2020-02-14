import React, { Component } from 'react';
import Modal from 'react-modal';
import Card from '../Card/Card.js'
import { loadCharacter, levelUp, getNewAbilities, getWeapons, switchWeapon } from '../Character.js'
import './CharacterSheet.css';

class CharacterSheet extends Component {
  state = {
    selectingAbility: false,
    newAbilities: [],
    character: {
      name: '',
      level: 0,
      hp: 0,
      abilities: []
    }
  }
  
  static defaultProps = {
    character : 'test'
  }
  
  componentDidMount() {
    this.monitorCharacter();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.character !== this.props.character) {
      this.monitorCharacter();
    }
  }

  monitorCharacter(character) {
    loadCharacter(
      this.props.character, 
      character => this.setState({character: character}),
      ability => this.setState({character: {...this.state.character, abilities: this.state.character.abilities.concat(ability)}}),
      weapon => this.setState({character: {...this.state.character, weapon: weapon}})
    )
  }
  
  levelUp = () => {
    getNewAbilities(this.state.character, this.handleNewAbilitiesLoaded)
    this.setState({ selectingAbility: 'ability' })
  }
  
  chooseWeapon = () => {
    getWeapons(this.state.character, this.handleNewAbilitiesLoaded)
    this.setState({ selectingAbility: 'weapon' })
  }
  
  handleNewAbilitiesLoaded = abilities => {
    this.setState({newAbilities: abilities})
  }
  
  handleAbilitySelected = selection => {
    switch(this.state.selectingAbility) {
      case 'ability':
        levelUp(this.state.character, selection);
        break;
      case 'weapon':
        switchWeapon(this.state.character, selection)
        break;
    }
    this.setState({ selectingAbility: false });
  }
  
  render() {
    return (
      <div className="App">
        {this.renderAbilitySelectModal()}
        <div className="CharacterHeader">
          <div className="CharacterName">{this.props.character}</div>
          <div className="LevelIndicator">Level: {this.state.character.level}</div>
          <div className="HitPoints">HP: {this.state.character.hp}</div>
          {this.renderLevelUpButton()}
        </div>
        <div className="Weapons">
          <div className="SectionHeader">Weapon <button onClick={this.chooseWeapon}>Change Weapon</button></div>
          <Card {...this.state.character.weapon} />  
        </div>
        <div className="Abilities">
          <div className="SectionHeader">Abilities</div>
          {this.state.character.abilities.map((option, index) => {
            return <Card key={"a"+index} {...option}/>
          })}
        </div>
      </div>
    );
  }

  renderLevelUpButton = () => {
    return this.state.character.level < this.state.character.levelCap ? (
    <button className="LevelUpButton" onClick={this.levelUp}>Level Up</button>
    ) : <div />
  }

  renderAbilitySelectModal() {
    return (
      <Modal
        isOpen={this.state.selectingAbility}
        contentLabel="Choose your ability"
      >
        <div className="ResearchOptions">
          {this.state.newAbilities.map((option, index) => {
            return <Card onSelect={() => this.handleAbilitySelected(option)} key={"b" + index} {...option}/>
          })}
        </div>
      </Modal>
    );
  }
}


export default CharacterSheet;
