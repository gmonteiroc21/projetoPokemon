import React, { useState, useEffect } from "react";
import axios from "axios";

const PokemonDetails = () => {
  const [pokemonNumber, setPokemonNumber] = useState("");
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonType, setPokemonType] = useState("");
  const [pokemonSprite, setPokemonSprite] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    fetchPokemonDetails();
  }, [pokemonNumber, refresh]);

  const fetchPokemonDetails = async () => {
    setLoading(true);
    try {
      if (
        pokemonNumber &&
        !isNaN(pokemonNumber) &&
        parseInt(pokemonNumber) <= 1010
      ) {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${pokemonNumber || refresh}`
        );
        const { name, types, sprites } = response.data;
        setPokemonName(name);

        // Obtendo o tipo do Pokémon
        const type = types[0].type.name;
        setPokemonType(type);

        // Obtendo o sprite do Pokémon
        const spriteUrl = sprites.front_default;
        setPokemonSprite(spriteUrl);

        setError("");
      } else {
        setPokemonName("");
        setPokemonType("");
        setPokemonSprite("");
        setError(
          "Número de Pokémon inválido. Digite um número entre 1 e 1010."
        );
      }
      setLoading(false);
      setRefresh(false);
    } catch (error) {
      console.error("Erro ao buscar detalhes do Pokémon:", error);
      setPokemonName("");
      setPokemonType("");
      setPokemonSprite("");
      setError(
        "Erro ao buscar detalhes do Pokémon. Verifique o número e tente novamente."
      );
      setLoading(false);
      setRefresh(false);
    }
  };

  const handleInputChange = (event) => {
    setPokemonNumber(event.target.value);
  };

  const handleRefreshClick = () => {
    setRefresh(pokemonNumber);
  };

  return (
    <div>
      <h2>Detalhes do Pokémon</h2>
      <input
        type="text"
        value={pokemonNumber}
        onChange={handleInputChange}
        placeholder="Digite o número do Pokémon"
      />
      <button onClick={handleRefreshClick}>Atualizar</button>
      {loading && <p>Carregando...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {pokemonName && <p>Nome do Pokémon: {pokemonName}</p>}
      {pokemonType && <p>Tipo do Pokémon: {pokemonType}</p>}
      {pokemonSprite && (
        <div>
          <img src={pokemonSprite} alt={`Sprite de ${pokemonName}`} />
        </div>
      )}
    </div>
  );
};

export default PokemonDetails;
