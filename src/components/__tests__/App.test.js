import Pokedex from "../pokedex/Pokedex";
import SinglePokemon from "../singlepokemon/SinglePokemon";
import React from "react";
import App from "../../App";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import "@testing-library/jest-dom/extend-expect";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";

jest.mock("../pokedex/Pokedex");
jest.mock("../singlepokemon/SinglePokemon");

describe("Tests for App Router", () => {
  test("Should render HomePage on default route", () => {
    // Arrange
    Pokedex.mockImplementation(() => <div>PokedexMock</div>);

    // Act
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    // Assert
    expect(screen.getByText("PokedexMock")).toBeInTheDocument();
  });

  test("Should render single pokemon page on single pokemon route", () => {
    // Arrange
    SinglePokemon.mockImplementation(() => <div>SinglePokemonMock</div>);

    // Act
    render(
      <MemoryRouter initialEntries={["/1"]}>
        <App />
      </MemoryRouter>
    );

    // Assert
    expect(screen.getByText("SinglePokemonMock")).toBeInTheDocument();
  });
});

// test("Smththth", async () => {
//   const history = createMemoryHistory();
//   render(
//     <MemoryRouter history={history}>
//       <App />
//     </MemoryRouter>
//   );
// });
