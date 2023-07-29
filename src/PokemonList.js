import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const limit = 20;
  const listRef = useRef(null);

  useEffect(() => {
    fetchPokemonList();
    listRef.current.addEventListener("scroll", handleScroll);
    return () => {
      listRef.current.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const fetchPokemonList = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
      );
      const results = response.data.results;
      setPokemonList((prevList) => [...prevList, ...results]);
      setOffset((prevOffset) => prevOffset + limit);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao buscar lista de Pokémon:", error);
      setLoading(false);
    }
  };

  const handleScroll = () => {
    const element = listRef.current;
    if (element.scrollHeight - element.scrollTop === element.clientHeight) {
      fetchMorePokemon();
    }
  };

  const fetchMorePokemon = () => {
    if (!loading) {
      fetchPokemonList();
    }
  };

  return (
    <React.Fragment>
      <h2>Lista de Pokémon</h2>
      <div className="pokemon-list" ref={listRef}>
        <ul>
          {pokemonList.map((pokemon, index) => (
            <li key={index}>{pokemon.name}</li>
          ))}
        </ul>
      </div>
      {loading && <p>Carregando...</p>}
    </React.Fragment>
  );
};

export default PokemonList;
