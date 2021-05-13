import axios from "axios";
import { BASE_URL } from "../config/api";

const populatePokedex = (offset) =>
  axios.get(`${BASE_URL}/pokemon?offset=${offset}&limit=50`).then((res) => {
    const { data } = res;
    const { results } = data;
    let newPokemonData = [];
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

const getCurrentType = (offset, currentType) => {
  return axios
    .get(`${BASE_URL}/type/${currentType}?offset=${offset}&limit=50`)
    .then((res) => {
      let newPokemonData = [];
      const { data } = res;
      const { pokemon } = data;
      pokemon.forEach((pokemon, index) => {
        let pokemonId = String(pokemon.pokemon.url).match(/\d/g);
        pokemonId = pokemonId.join("").substring(1);
        newPokemonData[pokemonId] = {
          id: pokemonId,
          name: pokemon.pokemon.name,
          sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`,
        };
      });
      return newPokemonData;
    });
};

const getCurrentSpecies = (offset, currentSpecies) => {
  return axios
    .get(
      `${BASE_URL}/pokemon-species/${currentSpecies}?offset=${offset}&limit=50`
    )
    .then((res) => {
      let newPokemonData = [];
      const { data } = res;
      const { varieties } = data;
      varieties.forEach((pokemon) => {
        let pokemonId = String(pokemon.pokemon.url).match(/\d/g);
        pokemonId = pokemonId.join("").substring(1);
        newPokemonData[pokemonId] = {
          id: pokemonId,
          name: pokemon.pokemon.name,
          sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`,
        };
      });
      return newPokemonData;
    });
};

export const APIService = {
  populatePokedex,
  getSinglePokemon,
  getAllTypes,
  getAllSpecies,
  getCurrentType,
  getCurrentSpecies,
};
