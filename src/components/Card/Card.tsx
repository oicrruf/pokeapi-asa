// interface Pokemon {
//   name: string;
//   url: string;
// }

import axios from "axios";
import { useEffect, useState } from "react";
import { ColorExtractor } from "react-color-extractor";
import { COLOR_TYPE } from "../../contanst";

// type PokemonList = Pokemon[];

const Card = ({ pokemon }: any) => {
  const [detail, setDetail] = useState<any>({});
  const [colors, setColors] = useState([]);
  useEffect(() => {
    axios
      .get(pokemon.url)
      .then(function (response) {
        setDetail(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const getColors = (detectedColorCodes: []) => {
    setColors(detectedColorCodes);
  };

  const renderTypes = (detail: any) =>
    detail.types?.map((t: any) => (
      <span
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.6)",
          // color: COLOR_TYPE[t.type.name],
          // borderWidth: 0.5,
        }}
        className="inline-flex items-center rounded-md  px-2 py-1 text-xs font-medium text-gray-500  ring-gray-500/10 mr-1 shadow"
      >
        {t.type.name}
      </span>
    ));

  return (
    <div
      className=" rounded-md px-4 h-64"
      style={{ backgroundColor: colors[4] ? colors[4] : "#c9c9c9" }}
    >
      <h3
        className=" text-center shadow-lg rounded-b-lg py-1 mb-4 text-gray-600 pokemon-name"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.7)",
        }}
      >
        {pokemon.name}
      </h3>
      <ColorExtractor getColors={getColors}>
        <img
          className="h-40 mb-1 m-auto"
          src={detail.sprites?.other["official-artwork"].front_default}
          alt="Image Alt"
        />
      </ColorExtractor>
      {renderTypes(detail)}
    </div>
  );
};

export default Card;
