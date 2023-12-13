/* eslint-disable react/prop-types */
import { IonCardSubtitle } from "@ionic/react";
const PokemonInfo = ({
  height,
  weight,
  types,
  abilities,
  backgroundColors,
}) => (
  <IonCardSubtitle>
    <p className="font-semibold text-xs text-center italic text-black">
      {height / 10} m | {weight / 10} kg
    </p>
    <div className="text-center">
      {types.map((type, index) => (
        <span
          key={index}
          className={`px-1 mx-auto rounded-full border-2 text-black border-black ${backgroundColors[index]}`}
        >
          {type.toUpperCase()}
        </span>
      ))}
      {abilities.map((abilityInfo, index) => (
        <span
          key={index}
          className=" bg-white bg-opacity-70 text-xs border border-black border-dashed text-black rounded-full flex justify-center"
        >
          {abilityInfo.ability.name.toUpperCase()}
        </span>
      ))}
    </div>
  </IonCardSubtitle>
);

export default PokemonInfo;
