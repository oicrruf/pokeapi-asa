import axios from "axios";
import { useEffect, useState } from "react";
import { ColorExtractor } from "react-color-extractor";
import { Link } from "react-router-dom";
// import { COLOR_TYPE } from "../../contanst";

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
        key={t.type.name}
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.6)",
        }}
        className="inline-flex items-center rounded-md  px-2 py-1 text-xs font-medium text-gray-500  ring-gray-500/10 mr-1 shadow text-pixel text-xsm"
      >
        {t.type.name}
      </span>
    ));

  return (
    <Link
      to={{
        pathname: "/",
        search: `?pokemon=${pokemon.name}`,
      }}
    >
      <div
        className=" rounded-md px-4 h-64"
        style={{ backgroundColor: colors[4] ? colors[4] : "#c9c9c9" }}
      >
        <h3
          className=" text-center shadow-lg rounded-b-lg py-1 mb-4 text-gray-600 text-pixel"
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
    </Link>
  );
};

export default Card;
