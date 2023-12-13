import axios from "axios";

//Llamada a la API REST de Pokemon, limitandolo en 30 para asi cargas más
export const getAllPokemons = async () => {
  try {
    const res = await axios.get(
      "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=30"
    );
    return {
      results: res.data.results,
      next: res.data.next,
    };
  } catch (error) {
    console.error(error);
  }
};

//LLamada a la URL de cada Pokemon, que se obtiene en la respuesta de la llamada de todos los pokemones.
export const getPokemonByUrl = async (url) => {
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
