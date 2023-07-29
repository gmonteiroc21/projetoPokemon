import React, { useState } from "react";
import axios from "axios";

const PokemonBattle = () => {
  const [pokemon1, setPokemon1] = useState("");
  const [pokemon2, setPokemon2] = useState("");
  const [pokemon1Data, setPokemon1Data] = useState(null);
  const [pokemon2Data, setPokemon2Data] = useState(null);
  const [winner, setWinner] = useState("");

  const handlePokemon1Change = (event) => {
    setPokemon1(event.target.value);
  };

  const handlePokemon2Change = (event) => {
    setPokemon2(event.target.value);
  };

  const handleBattle = async () => {
    if (pokemon1 && pokemon2) {
      try {
        const response1 = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${pokemon1}`
        );
        const response2 = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${pokemon2}`
        );
        setPokemon1Data(response1.data);
        setPokemon2Data(response2.data);
        const pokemon1Attack = response1.data.stats[1].base_stat;
        const pokemon2Attack = response2.data.stats[1].base_stat;
        if (pokemon1Attack > pokemon2Attack) {
          setWinner(response1.data.name);
        } else if (pokemon1Attack < pokemon2Attack) {
          setWinner(response2.data.name);
        } else {
          setWinner("Empate!");
        }
      } catch (error) {
        console.error("Erro ao buscar detalhes dos Pokémon:", error);
        setPokemon1Data(null);
        setPokemon2Data(null);
        setWinner(
          "Erro ao buscar detalhes dos Pokémon. Verifique os nomes e tente novamente."
        );
      }
    } else {
      setWinner("Por favor, digite os nomes dos dois Pokémon.");
    }
  };

  return (
    <div>
      <h2>Batalha Pokémon</h2>
      <div>
        <label>
          Pokémon 1:
          <input type="text" value={pokemon1} onChange={handlePokemon1Change} />
        </label>

        <label>
          Pokémon 2:
          <input type="text" value={pokemon2} onChange={handlePokemon2Change} />
        </label>
        <button onClick={handleBattle}>Iniciar Batalha</button>
      </div>
      {winner && <p>Resultado da Batalha: {winner}</p>}
      <div>
        {pokemon1Data && (
          <div>
            <h3>{pokemon1Data.name}</h3>
            <img
              src={pokemon1Data.sprites.front_default}
              alt={pokemon1Data.name}
            />
            <p>Ataque: {pokemon1Data.stats[1].base_stat}</p>
            {/* Outras informações relevantes */}
          </div>
        )}
        {pokemon2Data && (
          <div>
            <h3>{pokemon2Data.name}</h3>
            <img
              src={pokemon2Data.sprites.front_default}
              alt={pokemon2Data.name}
            />
            <p>Ataque: {pokemon2Data.stats[1].base_stat}</p>
            {/* Outras informações relevantes */}
          </div>
        )}
      </div>
    </div>
  );
};

export default PokemonBattle;
