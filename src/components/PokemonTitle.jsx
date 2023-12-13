/* eslint-disable react/prop-types */
import { IonCardTitle } from "@ionic/react";

const PokemonTitle = ({ id, name, backgroundColor }) => (
  <IonCardTitle
    className={`text-xl italic font-mono font-extrabold text-center border-2 text-black border-black rounded-lg ${backgroundColor}`}
  >
    #{id} {name.toUpperCase()}
  </IonCardTitle>
);

export default PokemonTitle;
