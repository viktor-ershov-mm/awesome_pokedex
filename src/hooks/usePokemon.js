import { useEffect, useState } from "react";
import { APIService } from "../services/APIService";

export const usePokemon = (offset, type, species) => {
  const [pokemonData, setPokemonData] = useState([]);

  useEffect(() => {
    async function getPokemon() {
      let pokeData;
      if (type) {
        pokeData = await APIService.getCurrentType(offset, type);
      } else if (species) {
        pokeData = await APIService.getCurrentSpecies(offset, species);
      } else {
        pokeData = await APIService.populatePokedex(offset);
      }

      setPokemonData(pokeData);
    }
    getPokemon();
  }, [offset, type, species]);

  return [pokemonData, setPokemonData];
};
