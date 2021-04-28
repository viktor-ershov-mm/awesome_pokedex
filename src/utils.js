import React from "react";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import Pagination from "@material-ui/lab/Pagination";

export const toFirstCharUppercase = (name) =>
  name.charAt(0).toUpperCase() + name.slice(1);

export const maxPokemonLimitPage = 800 / 50 + 1;

// export const getPokemonCard = (pokemonId) => {
//   const { id, name, sprite } = pokemonData[pokemonId];
//   return (
//     <Grid item xs={4} key={pokemonId}>
//       <Card onClick={() => history.push(`/${pokemonId}`)}>
//         <CardMedia
//           className={classes.cardMedia}
//           image={sprite}
//           style={{ width: "130px", height: "130px" }}
//         />
//         <CardContent className={classes.cardContent}>
//           <Typography>{`${id}. ${toFirstCharUppercase(name)}`}</Typography>
//         </CardContent>
//       </Card>
//     </Grid>
//   );
// };
