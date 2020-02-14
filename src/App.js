import React, { Component, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
  Redirect
} from "react-router-dom";
import CharacterSheet from './CharacterSheet/CharacterSheet.js'

import './App.css'

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" children={<HomePageRoute />} />
          <Route path="/characters/:name" children={<CharacterSheetRoute />} />
        </Switch>
      </Router>
    )
  }
}

// unpopular opinion, hooks kinda suck
function CharacterSheetRoute() {
  let { name } = useParams();
  return (
    <CharacterSheet character={name} />
  )
}

function HomePageRoute() {
  const [redirect, setRedirect] = useState(false);
  const [formData, setFormData] = useState('');
  
  return redirect ? (
    <Redirect to={"/characters/" + redirect} push={true} />
  ) : (
    <div className="HomePage">
      <h1>Welcome to Psistorm!</h1>
      <h2>Name your character:</h2>
      <form className="CharacterSelectForm" onSubmit={()=>setRedirect(formData)}>
        <input type="text" value={formData} onChange={e => setFormData(e.target.value)} />
        <input type="submit" style={{display: "none"}} />
      </form>
    </div>
  )
}

export default App;