import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
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
        `https://pokeapi.co/api/v2/pokemon?offset=${(page - 1) * 20}&limit=20`
      );
      const results = response.data.results;
      setPokemonList((prevList) => [
        ...prevList,
        ...results.map((pokemon) => pokemon.name),
      ]);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao buscar lista de Pokémon:", error);
      setLoading(false);
    }
  };

  const handleScroll = () => {
    const element = listRef.current;
    if (
      element.scrollHeight - element.scrollTop === element.clientHeight &&
      !loading
    ) {
      setPage((prevPage) => prevPage + 1); // Incrementa a página para buscar novos Pokémon na próxima requisição
    }
  };

  useEffect(() => {
    if (page > 1) {
      fetchPokemonList(); // Chama a função para buscar novos Pokémon sempre que a página for maior que 1
    }
  }, [page]);

  return (
    <>
      <h2>Lista de Pokémon</h2>
      <div
        className="pokemon-list"
        ref={listRef}
        style={{
          height: "300px", // Altura do div de scroll
          overflowY: "auto", // Habilita o scroll
          border: "1px solid #ccc", // Apenas para visualização
        }}
      >
        <ul>
          {pokemonList.map((pokemonName) => (
            <li key={pokemonName}>{pokemonName}</li>
          ))}
        </ul>
      </div>
      {loading && <p>Carregando...</p>}
    </>
  );
};

export default PokemonList;
