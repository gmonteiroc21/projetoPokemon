import React from "react";
import PokemonDetails from "./PokemonDetails";
import PokemonBattle from "./PokemonBattle";
import PokemonList from "./PokemonList";
import "./App.css"; // Importando o arquivo de estilos CSS

function App() {
  return (
    <div className="app-container">
      <div className="column">
        <PokemonDetails />
      </div>
      <div className="column">
        <PokemonBattle />
      </div>
      <div className="column">
        <PokemonList />
      </div>
    </div>
  );
}

export default App;
