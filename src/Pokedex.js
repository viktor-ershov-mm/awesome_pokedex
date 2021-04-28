import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import Pagination from "@material-ui/lab/Pagination";
import { toFirstCharUppercase, maxPokemonLimitPage } from "./utils";
import axios from "axios";
import { usePokemon } from "./hooks/usePokemon";

const Pokedex = (props) => {
  const { history } = props;
  const classes = useStyles();
  const [offset, setOffset] = useState(0);
  const pokemonData = usePokemon(offset);
  const [filter, setFilter] = useState("");
  const [types, setTypes] = useState([]);
  const [species, setSpecies] = useState([]);
  const [currentSpecies, setCurrentSpecies] = useState("");
  const [currentType, setCurrentType] = useState("");

  const searchHandler = (e) => {
    setFilter(e.target.value);
  };

  const typesHandler = (e, child) => {
    setCurrentType(child.props.value);
  };

  const speciesHandler = (e, child) => {
    console.log(child.props.value);
    setCurrentSpecies(child.props.value);
  };

  const paginationHandler = (e, page) => {
    const calculatedOffset = (page - 1) * 50;
    setOffset(calculatedOffset);
  };

  // useEffect(() => {
  //   axios.get("https://pokeapi.co/api/v2/type").then((res) => {
  //     const { data } = res;
  //     const { results } = data;
  //     let typesOfPokemon = [];
  //     results.forEach((type) => {
  //       typesOfPokemon.push(type.name);
  //     });
  //     setTypes(typesOfPokemon);
  //   });
  //   axios.get("https://pokeapi.co/api/v2/pokemon-species").then((res) => {
  //     const { data } = res;
  //     const { results } = data;
  //     let speciesOfPokemon = [];
  //     results.forEach((species) => {
  //       speciesOfPokemon.push(species.name);
  //     });
  //     console.log(speciesOfPokemon);
  //     setSpecies(speciesOfPokemon);
  //   });
  // }, []);

  // useEffect(() => {
  //   if (currentType) {
  //     axios.get(`https://pokeapi.co/api/v2/type/${currentType}`).then((res) => {
  //       const { data } = res;
  //       const { results } = data;
  //       let newPokemonData = {};
  //       results.forEach((pokemon, index) => {
  //         newPokemonData[offset + index + 1] = {
  //           id: offset + index + 1,
  //           name: pokemon.name,
  //           sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
  //             offset + index + 1
  //           }.png`,
  //         };
  //       });
  //       setPokemonData(newPokemonData);
  //     });
  //   } else {
  //     axios.get(`https://pokeapi.co/api/v2/type/${currentType}`).then((res) => {
  //       const { data } = res;
  //       const { results } = data;
  //       let speciesOfPokemon = [];
  //       results.forEach((species) => {
  //         speciesOfPokemon.push(species.name);
  //       });
  //       console.log(speciesOfPokemon);
  //       setSpecies(speciesOfPokemon);
  //     });
  //   }
  // }, [currentType, currentSpecies]);

  const getPokemonCard = (pokemonId) => {
    const { id, name, sprite } = pokemonData[pokemonId];
    return (
      <Grid item xs={4} key={pokemonId}>
        <Card onClick={() => history.push(`/${pokemonId}`)}>
          <CardMedia
            className={classes.cardMedia}
            image={sprite}
            style={{ width: "130px", height: "130px" }}
          />
          <CardContent className={classes.cardContent}>
            <Typography>{`${id}. ${toFirstCharUppercase(name)}`}</Typography>
          </CardContent>
        </Card>
      </Grid>
    );
  };

  return (
    <>
      <AppBar className={classes.appBar} position="static">
        <Toolbar className={classes.toolbar}>
          <div className={classes.searchContainer}>
            <SearchIcon className={classes.searchIcon} />
            <TextField
              className={classes.searchInput}
              label="PokeSearch"
              variant="standard"
              onChange={searchHandler}
            />
          </div>
          <FormControl className={classes.typesStyle}>
            <InputLabel id="demo-simple-select-label">Types</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              onChange={typesHandler}
              value={"None"}
            >
              {types.map((typeElement) => {
                return (
                  <MenuItem key={typeElement} value={typeElement}>
                    {typeElement}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <FormControl className={classes.speciesStyle}>
            <InputLabel id="demo-simple-select-label">Species</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              onChange={speciesHandler}
              value={"None"}
            >
              {species.map((speciesElement) => {
                return (
                  <MenuItem key={speciesElement} value={speciesElement}>
                    {speciesElement}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Toolbar>
      </AppBar>
      <div className={classes.paginationWrapper}>
        <Pagination
          className={classes.pagination}
          count={maxPokemonLimitPage}
          onChange={paginationHandler}
        />
      </div>
      {pokemonData ? (
        <div>
          <Grid container spacing={2} className={classes.pokedexContainer}>
            {Object.keys(pokemonData).map(
              (pokemonId) =>
                pokemonData[pokemonId].name.includes(filter) &&
                getPokemonCard(pokemonId)
            )}
          </Grid>
        </div>
      ) : (
        <CircularProgress className={classes.spinnerStyle} />
      )}
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  pokedexContainer: {
    paddingTop: "20px",
    paddingLeft: "50px",
    paddingRight: "50px",
  },
  cardMedia: {
    margin: "auto",
  },
  cardContent: {
    textAlign: "center",
  },
  searchContainer: {
    display: "flex",
    paddingLeft: "20px",
    paddingRight: "20px",
    marginBottom: "5px",
    marginTop: "5px",
  },
  searchIcon: {
    alignSelf: "flex-end",
    marginBottom: "5px",
  },
  searchInput: {
    width: "200px",
    margin: "5px",
  },
  toolbar: {
    display: "flex",
    justifyContent: "center",
  },
  appBar: {
    backgroundColor: "transparent",
  },
  speciesStyle: {
    width: "100px",
    paddingLeft: "20px",
    paddingRight: "20px",
    marginBottom: "5px",
    marginTop: "5px",
  },
  typesStyle: {
    width: "100px",
    paddingLeft: "20px",
    paddingRight: "20px",
    marginBottom: "5px",
    marginTop: "5px",
  },
  paginationWrapper: {
    display: "flex",
    justifyContent: "flex-start",
  },
  pagination: {
    backgroundColor: "white",
  },
  typesFilter: {
    height: "auto",
  },
}));

export default Pokedex;
