import { useEffect, useState } from "react";
import { APIService } from "../services/APIService";

export const usePokemon = (offset) => {
  const [pokemonData, setPokemonData] = useState({});

  useEffect(() => {
    async function getPokemon() {
      let pokeData = await APIService.populatePokedex(offset);
      setPokemonData(pokeData);
    }
    getPokemon();
  }, [offset]);

  return [pokemonData, setPokemonData];
};
