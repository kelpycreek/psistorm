//this file contains devtools, mostly for interacting with firebase.

import * as firebase from 'firebase';
import firebaseConfig from './config.js'
import { weapons, abilities } from './techtree.js'


firebase.initializeApp(firebaseConfig, "admin");

var db = firebase.firestore();


// sets the whole db to be equal to what is in the techtree
export function updateDb() {
  var batch = db.batch();
  abilities.forEach(ability => {
    batch.set(
      db.collection('abilities').doc(ability.name),
      ability
    )
  });
  weapons.forEach(weapon => {
    batch.set(
      db.collection('weapons').doc(weapon.name),
      weapon
    )
  });
  batch.commit();
}