import { useEffect, useState } from "react";
import {
  getAllPokemon,
  getPokemon,
  getPokemonSpecies,
} from "./util/pokemon.jsx";
import Card from "./components/Card/Card";

function App() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon";
  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState([]);

  useEffect(() => {
    const fetchPokemonData = async () => {
      // 全てのポケモンデータを取得
      let res = await getAllPokemon(initialURL);
      // 各ポケモンの詳細なデータを取得
      loadPokemon(res.results);
      setLoading(false);
    };
    fetchPokemonData();
  }, []);

  const loadPokemon = async (data) => {
    let _pokemonData = await Promise.all(
      data.map(async (pokemon) => {
        // 各ポケモンの情報を取得
        let pokemonRecord = await getPokemon(pokemon.url);
        // さらに詳細なデータを取得
        let species = await getPokemonSpecies(pokemonRecord.species.url);

        // speciesの情報から日本語データのみを抽出
        let japaneseData = {
          name: species.names.find((name) => name.language.name === "ja").name,
          // 他の必要な日本語データもここで抽出することができます
        };

        // 日本語データのみを使用したい場合、pokemonRecordではなくjapaneseDataを返す
        return japaneseData;
      })
    );
    setPokemonData(_pokemonData);
  };

  return (
    <div>
      {console.log(pokemonData)}
      {/* {loading ? (
        <h1>ロード中...</h1>
      ) : (
        <>
          <div className="pokemonCardContainer">
            {pokemonData.map((pokemon) => {
              return <Card key={pokemon.name} pokemon={pokemon} />;
            })}
          </div>
        </>
      )} */}
    </div>
  );
}

export default App;
