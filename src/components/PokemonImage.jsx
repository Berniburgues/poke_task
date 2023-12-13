/* eslint-disable react/prop-types */
import { IonImg } from "@ionic/react";
const PokemonImage = ({ imageUrl, backgroundColor }) => (
  <IonImg
    alt=""
    src={imageUrl}
    className={`w-auto h-40 object-contain rounded-full border-2 border-black ${backgroundColor}`}
  />
);

export default PokemonImage;
