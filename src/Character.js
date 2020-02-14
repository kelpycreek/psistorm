import * as firebase from 'firebase';
import firebaseConfig from './config.js'


firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();

export function createCharacter(characterName) {
  db.doc('characters/'+characterName).set({
    level: 0,
    levelCap: 1,
    hp: 1,
    abilityRefs: [],
    weaponRef: db.doc('weapons/pistol')
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
    abilities => callback(abilities.docs.map(
      ability => {return {id: ability.id, ref: ability.ref, ...ability.data()}}
    ))
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


function getTree() {
  return [
    {
      title: 'Psychic Blades',
      tags: 'Upkeep 1',
      short: 'You can create weapons of psychic force, which you use to dismantle your enemies',
      long: 'You can create a weapon of psychic force, such as a sword, a hammer, a spear or any similar weapon of your choosing. \n \
            As an action you can spend 1 psipoint to Strike a creature with this weapon, dealing 1d8 damage to it. \n  \
            Manifesting the blade can be done at will as long as you have a free hand.'
    },
    {
      title: 'Force Barrier',
      tags: 'Upkeep 1',
      short: 'You create a hardened barrier of force around yourself, protecting you from harm.',
      long: 'As an action you create a hardened barrier of force around yourself. When you manifest this power spend up to 2 psipoints, gaining 4 temporary hp per point expended.'
    },
    {
      title: 'Force Barrier 2',
      tags: 'Upkeep 1',
      short: 'You create a hardened barrier of force around yourself, protecting you from harm.',
      long: 'Youve spent hundreds of hours practicing your personal forcefield. You can spend up to 4 psipoints to manifest your Force Barrier'
    }
  ];
}