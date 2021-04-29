import React from "react";
import Pokedex from "./components/pokedex/Pokedex";
import SinglePokemon from "./components/singlepokemon/SinglePokemon";
import { Switch, Route } from "react-router";

function App() {
  return (
    <Switch>
      <Route exact path="/" render={(props) => <Pokedex {...props} />} />
      <Route
        exact
        path="/:pokemonId"
        render={(props) => <SinglePokemon {...props} />}
      />
    </Switch>
  );
}

export default App;
