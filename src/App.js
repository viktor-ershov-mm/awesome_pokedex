import React from "react";
import Pokedex from "./Pokedex";
import SinglePokemon from "./SinglePokemon";
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
