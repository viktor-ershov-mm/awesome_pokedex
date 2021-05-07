import React, { useEffect, useState, useRef } from "react";
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
  Button,
  Table,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import Pagination from "@material-ui/lab/Pagination";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropDown";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { toFirstCharUppercase, maxPokemonLimitPage } from "../../utils";
import axios from "axios";
import { usePokemon } from "../../hooks/usePokemon";

const Pokedex = (props) => {
  const { history } = props;
  const classes = useStyles();
  const [offset, setOffset] = useState(0);
  const [pokemonData, setPokemonData] = usePokemon(offset);
  const [filter, setFilter] = useState("");
  const [types, setTypes] = useState([]);
  const [species, setSpecies] = useState([]);
  const [currentSpecies, setCurrentSpecies] = useState("");
  const [currentType, setCurrentType] = useState("");
  const [orderBy, setOrderBy] = useState("Name");

  const initialRender = useRef(true);
  const uniqueCount = useRef("");

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

  const orderByHandler = (e, child) => {
    setOrderBy(child.props.value);
  };

  useEffect(() => {
    axios.get("https://pokeapi.co/api/v2/type").then((res) => {
      const { data } = res;
      const { results } = data;
      let typesOfPokemon = [];
      results.forEach((type) => {
        typesOfPokemon.push(type.name);
      });
      setTypes(typesOfPokemon);
    });
    axios.get("https://pokeapi.co/api/v2/pokemon-species").then((res) => {
      const { data } = res;
      const { results } = data;
      let speciesOfPokemon = [];
      results.forEach((species) => {
        speciesOfPokemon.push(species.name);
      });
      setSpecies(speciesOfPokemon);
    });
  }, []);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      if (currentType) {
        axios
          .get(`https://pokeapi.co/api/v2/type/${currentType}`)
          .then((res) => {
            const { data } = res;
            const { pokemon } = data;
            console.log(pokemon);
            let newPokemonData = {};
            pokemon.forEach((pokemon, index) => {
              let pokemonId = String(pokemon.pokemon.url).match(/\d/g);
              pokemonId = pokemonId.join("").substring(1);
              if (
                Object.values(pokemonData).some(
                  (e) => e.id === Number(pokemonId)
                )
              ) {
                newPokemonData[pokemonId] = {
                  id: pokemonId,
                  name: pokemon.pokemon.name,
                  sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`,
                };
              }
            });
            setPokemonData(newPokemonData);
          });
      } else {
        axios
          .get(`https://pokeapi.co/api/v2/pokemon-species/${currentSpecies}`)
          .then((res) => {
            const { data } = res;
            const { varieties } = data;
            let newPokemonData = {};
            varieties.forEach((variety, index) => {
              let pokemonId = String(variety.pokemon.url).match(/\d/g);
              pokemonId = pokemonId.join("").substring(1);
              if (
                Object.values(pokemonData).some(
                  (e) => e.id === Number(pokemonId)
                )
              ) {
                newPokemonData[pokemonId] = {
                  id: pokemonId,
                  name: variety.pokemon.name,
                  sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`,
                };
              }
            });
            setPokemonData(newPokemonData);
          });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentType, currentSpecies]);

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
            <h1>Count: {}</h1>
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
        <p className={classes.orderByText}>Order by: </p>
        <FormControl className={classes.typesStyle}>
          {/* <InputLabel id="demo-simple-select-label">Order by</InputLabel> */}
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            onChange={orderByHandler}
            value={"None"}
          >
            <MenuItem key={1} value={"Name"}>
              Name
            </MenuItem>
            <MenuItem key={2} value={"Number"}>
              Number
            </MenuItem>
          </Select>
        </FormControl>
        <Button>
          <ArrowDropDownIcon />
        </Button>
        <Button>
          <ArrowDropUpIcon />
        </Button>
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
  backButton: {
    backgroundImage: "linear-gradient(315deg, #fff000 0%, #ed008c 74%)",
    fontWeight: "bold",
    marginTop: "10px",
    marginLeft: "10px",
  },
  orderByText: {
    // display: "inline-block",
    // verticalAlign: "middle",
    // lineHeight: "normal",
    textAlign: "center",
  },
}));

export default Pokedex;
