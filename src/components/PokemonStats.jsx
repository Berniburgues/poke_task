/* eslint-disable react/prop-types */

import { IonCardContent, IonGrid, IonRow, IonCol } from "@ionic/react";

const PokemonStats = ({ stats }) => (
  <IonCardContent className="text-xs border-2 border-black bg-white bg-opacity-50 rounded-3xl">
    <IonGrid>
      <IonRow>
        {stats.map((stat) => (
          <IonCol
            key={stat.stat.name}
            className="text-center flex flex-col justify-center items-center text-black"
          >
            <p>
              {(() => {
                switch (stat.stat.name) {
                  case "special-attack":
                    return "SP ATK";
                  case "special-defense":
                    return "SP DEF";
                  case "attack":
                  default:
                    return stat.stat.name.toUpperCase();
                }
              })()}
            </p>
            <p>{stat.base_stat}</p>
          </IonCol>
        ))}
      </IonRow>
    </IonGrid>
  </IonCardContent>
);

export default PokemonStats;
