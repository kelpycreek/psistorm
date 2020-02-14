import * as firebase from 'firebase';
import firebaseConfig from './config.js'


firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();

export function createCharacter(characterName) {
  db.doc('characters/'+characterName).set({
    level: 0,
    levelCap: 0,
    hp: 1,
    abilityRefs: [],
    weaponRef: db.doc('weapons/AX-32 Tiger Shark Pistol')
  })
}

export function loadCharacter(characterName, characterLoaded, abilityLoaded, weaponLoaded) {
  db.collection("characters").doc(characterName)
    .onSnapshot(doc => {
      console.log('wheeee ', doc)
      if (doc.exists) {
        doc.data().abilityRefs.map(ref => ref.get().then(ability => abilityLoaded({id: ability.id, ...ability.data()})))
        doc.data().weaponRef.get().then(weapon => weaponLoaded({id: weapon.id, ref: weapon.ref, ...weapon.data()}))
        characterLoaded({abilities: [], id: doc.id, ref: doc.ref, ...doc.data()})
      } else {
        /* onSnapshot will get called again once we finish creating the character
        And since create is idempotent we should be good as long as people arent leveling up really fast */
        createCharacter(characterName)
      }
    });
}

export function getNewAbilities(character, callback) {
  db.collection('abilities').get().then(
    abilities => callback(
      generateAbilitySelection(character,
        abilities.docs.map(
          ability => {return {id: ability.id, ref: ability.ref, ...ability.data()}}
    )))
  )
}

export function getWeapons(character, callback) {
  db.collection('weapons').get().then(
    weapons => callback(weapons.docs.map(
      weapon => {return {id: weapon.id, ref: weapon.ref, ...weapon.data()}}
    ))
  )
}

export function levelUp(character, ability) {
  console.log('levelling up!')
  character.ref.update({
    level: character.level + 1,
    hp: character.level * 2 + 10,
    abilityRefs: character.abilityRefs.concat(ability.ref)
  })
}

export function switchWeapon(character, weapon) {
  console.log('switching weapons!')
  character.ref.update({
    weaponRef: weapon.ref
  })
}

// Logic for generating a list of abilities on levelup
// Can be optimized if we run into performance probs here
function generateAbilitySelection(character, abilities) {
  let reducedAbilities = abilities.filter(ability => {
    // remove abilities we already have
    console.log('filtering: ', ability);
    if (character.abilities.some(ab2 => ability.id === ab2.id)) return false;
    console.log('we dont already have it! good!')
    // remove abilities we dont have the prerequisites for
    for (const index in ability.prereqs) {
      if (!character.abilities.some(ab2 => ab2.id === ability.prereqs[index])) return false;
    }
    console.log('valid!')
    
    // success! its a valid ability
    return true;
  })
  // randomize the valid abilities
  shuffle(reducedAbilities)
  console.log('next up!')
  // and finally return a random 4
  return reducedAbilities.slice(0,3)
}

//https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
function shuffle(array) {
    let counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}
