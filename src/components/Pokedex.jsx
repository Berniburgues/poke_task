/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import "@ionic/react/css/core.css";
import {
  IonContent,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonTitle,
  IonHeader,
  IonToolbar,
} from "@ionic/react";
import { setupIonicReact } from "@ionic/react";
import { getAllPokemons } from "../services/pokemonService";
import PokemonCard from "./PokemonCard";

//Función de llamada de el framework Ionic para React
setupIonicReact();

const Pokedex = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [error, setError] = useState(null);
  const [page, setNextPage] = useState("");

  //Efecto para la carga de los primeros 30 Pokemones
  useEffect(() => {
    const firstPokemons = async () => {
      try {
        const response = await getAllPokemons();
        setPokemonData(response.results);
        setNextPage(response.next);
      } catch (error) {
        setError(error);
      }
    };

    firstPokemons();
  }, []);

  //Funcion para cargar más pokemones al llegar al final de la pagina, y frenar en 150 (primera generación)
  const loadMorePokemons = async (event = null) => {
    try {
      if (page) {
        const newPokemons = await axios.get(page);

        if (newPokemons.data.results.length > 0) {
          const totalPokemonCount =
            pokemonData.length + newPokemons.data.results.length;

          if (totalPokemonCount <= 152) {
            setPokemonData((prevData) => [
              ...prevData,
              ...newPokemons.data.results,
            ]);
            setNextPage(newPokemons.data.next);
          } else {
            // Desactivar la carga infinita si ya hay más de 151 Pokémones
            if (event) {
              event.target.complete();
            }
          }
        } else {
          // Desactivar la carga infinita si no hay más resultados
          if (event) {
            event.target.complete();
          }
        }
      }
    } catch (error) {
      console.error("Error al cargar más datos:", error);
    }
  };

  return (
    <IonPage>
      <IonContent>
        <IonRefresher slot="fixed" onIonRefresh={(e) => loadMorePokemons(e)}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        <IonHeader className=" mb-2 border-2 border-black">
          <IonToolbar>
            <IonTitle className="text-3xl text-center font-bold text-black">
              Pokemon! First Generation
            </IonTitle>
          </IonToolbar>
        </IonHeader>

        <section className="flex flex-wrap gap-3">
          {pokemonData.map((pokemon) => (
            <PokemonCard key={pokemon.url} pokemon={pokemon} />
          ))}
        </section>
        <IonInfiniteScroll
          onIonInfinite={(event) => {
            loadMorePokemons(event);
            setTimeout(() => event.target.complete(), 2500);
          }}
        >
          <IonInfiniteScrollContent
            loadingSpinner="bubbles"
            loadingText="Loading More..."
          ></IonInfiniteScrollContent>
        </IonInfiniteScroll>
      </IonContent>
    </IonPage>
  );
};

export default Pokedex;
