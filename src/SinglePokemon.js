import React, { useEffect, useState } from "react";
import {
  Typography,
  CircularProgress,
  Button,
  Card,
  CardContent,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { toFirstCharUppercase } from "./utils";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import axios from "axios";
import "./fonts/PokemonSolid.ttf";

const SinglePokemon = (props) => {
  const classes = useStyles();
  const { match, history } = props;
  const { params } = match;
  const { pokemonId } = params;
  const [pokemon, setPokemon] = useState(undefined);

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
      .then((res) => {
        const { data } = res;
        setPokemon(data);
      })
      .catch((e) => {
        setPokemon(false);
      });
  }, [pokemonId]);

  const generatePokemonJSX = () => {
    const { name, id, species, height, weight, types, sprites } = pokemon;
    const pokemonUrl = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;
    const { front_default } = sprites;
    return (
      <div className={classes.infoContainer}>
        <Typography className={classes.heading} variant="h1">
          {toFirstCharUppercase(name)}
        </Typography>
        <img style={{ width: "300px", height: "300px" }} src={pokemonUrl} />

        <Card className={classes.cardStyle}>
          <CardContent>
            <Typography variant="h3">Pokemon Info</Typography>
            <Typography>{`Species: ${species.name}`}</Typography>
            <Typography>Height: {height}</Typography>
            <Typography>Weight: {weight}</Typography>
            <Typography variant="h6">Types</Typography>
            {types.map((typeInfo) => {
              const { type } = typeInfo;
              const { name } = type;
              return <Typography key={name}>{`${name}`}</Typography>;
            })}
          </CardContent>
        </Card>
      </div>
    );
  };
  return (
    <>
      {pokemon === undefined && (
        <CircularProgress className={classes.spinner} />
      )}
      {pokemon !== undefined && (
        <Button
          className={classes.backButton}
          variant="contained"
          onClick={() => history.push("/")}
        >
          <ArrowBackIcon style={classes.backIcon}></ArrowBackIcon>
          back to pokedex
        </Button>
      )}
      {pokemon !== undefined && pokemon && generatePokemonJSX(pokemon)}
      {pokemon === false && <Typography> Pokemon not found</Typography>}
    </>
  );
};

const useStyles = makeStyles(() => ({
  infoContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    fontFamily: "PokemonSolid",
  },
  backButton: {
    backgroundImage: "linear-gradient(315deg, #fff000 0%, #ed008c 74%)",
    fontWeight: "bold",
    marginTop: "10px",
    marginLeft: "10px",
  },
  spinner: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: "-50px",
    marginLeft: "-50px",
    width: "100px",
    height: "100px",
  },
}));

export default SinglePokemon;
