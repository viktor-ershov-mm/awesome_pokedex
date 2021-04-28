import axios from "axios";
import { BASE_URL } from "../config/api";

const populatePokedex = (offset) =>
  axios.get(`${BASE_URL}/pokemon?offset=${offset}&limit=50`).then((res) => {
    const { data } = res;
    const { results } = data;
    let newPokemonData = {};
    results.forEach((pokemon, index) => {
      newPokemonData[offset + index + 1] = {
        id: offset + index + 1,
        name: pokemon.name,
        sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
          offset + index + 1
        }.png`,
      };
    });
    return newPokemonData;
  });

const getSinglePokemon = (id) => {
  axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`);
};

const getAllTypes = () => {
  axios.get(`https://pokeapi.co/api/v2/type`);
};

const getAllSpecies = () => {
  axios.get(`https://pokeapi.co/api/v2/pokemon-species`);
};

const getCurrentType = (currentType) => {
  axios.get(`https://pokeapi.co/api/v2/type/${currentType}`);
};

const getCurrentSpecies = (currentSpecies) => {
  axios.get(`https://pokeapi.co/api/v2/pokemon-species/${currentSpecies}`);
};

export const APIService = {
  populatePokedex,
  getSinglePokemon,
  getAllTypes,
  getAllSpecies,
  getCurrentType,
  getCurrentSpecies,
};
