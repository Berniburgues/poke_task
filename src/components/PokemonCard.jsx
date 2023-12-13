/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { getPokemonByUrl } from "../services/pokemonService";
import { backGroundCardColor } from "../utils/pokemonColors";
import { IonCard, IonCardHeader } from "@ionic/react";
import PokemonImage from "./PokemonImage";
import PokemonTitle from "./PokemonTitle";
import PokemonInfo from "./PokemonInfo";
import PokemonStats from "./PokemonStats";

const PokemonCard = ({ pokemon }) => {
  const [pokemonDetails, setPokemonDetails] = useState(null);
  const [error, setError] = useState(null);

 //Efecto para cargar los datos de cada Pokemon
  useEffect(() => {
    const loadPokemonDetails = async () => {
      try {
        const details = await getPokemonByUrl(pokemon.url);
        setPokemonDetails(details);
      } catch (error) {
        console.error("Error al obtener detalles del Pokémon:", error);
        setError(error);
      }
    };
    loadPokemonDetails();
  }, [pokemon.url]);

  //Se muestra el texto Loading hasta que carguen los pokemones.
  if (!pokemonDetails) {
    return <p>Loading</p>;
  }

  //ALgoritmo para establecer el fondo segun el tipo de Pokemon
  const typeBackgroundColors = pokemonDetails.types.map(
    (type) => backGroundCardColor[type.type.name]
  );

  return (
    <IonCard
      mode="md"
      className={`w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6 mx-auto my-auto p-1 border-2 border-black bg-gradient-to-b from-transparent to-${typeBackgroundColors[0]}`}
    >
      <>
        <PokemonImage
          imageUrl={pokemonDetails.sprites.other.dream_world["front_default"]}
          backgroundColor={typeBackgroundColors[0]}
        />
        <IonCardHeader>
          <PokemonTitle
            id={pokemonDetails.id}
            name={pokemon.name}
            backgroundColor={typeBackgroundColors[0]}
          />
          <PokemonInfo
            height={pokemonDetails.height}
            weight={pokemonDetails.weight}
            types={pokemonDetails.types.map((type) =>
              type.type.name.toUpperCase()
            )}
            abilities={pokemonDetails.abilities}
            backgroundColors={typeBackgroundColors}
          />
        </IonCardHeader>
        <PokemonStats stats={pokemonDetails.stats} />
      </>
    </IonCard>
  );
};

export default PokemonCard;
