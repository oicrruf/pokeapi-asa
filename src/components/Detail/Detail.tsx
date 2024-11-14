import axios from "axios";
import { useEffect, useState } from "react";
import { ColorExtractor } from "react-color-extractor";
import { useLocation } from "react-router-dom";

const Detail = () => {
  const [detail, setDetail] = useState<any | null>({});
  const [pokemon, setPokemon] = useState<string | null>(null);
  const [colors, setColors] = useState([]);

  const location = useLocation();

  useEffect(() => {
    console.log(pokemon);

    pokemon !== null &&
      axios
        .get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        .then((response) => {
          setDetail(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
  }, [pokemon]);

  useEffect(() => {
    const pokemonByQueryParams = new URLSearchParams(location.search).get(
      "pokemon"
    );
    pokemonByQueryParams && setPokemon(pokemonByQueryParams);
  }, [location]);

  const getColors = (detectedColorCodes: []) => {
    setColors(detectedColorCodes);
  };
  return (
    <div className="h-[300px] w-full bg-gray-200  mb-3 rounded   flex  justify-center flex-col">
      {detail === null ? (
        <h5 className="text-pixel text-gray-600 text-center">
          Selecciona un Pokémon para ver su detalle...
        </h5>
      ) : (
        <div
          className="flex justify-between rounded flex-auto"
          style={{ backgroundColor: colors[4] ? colors[4] : "#c9c9c9" }}
        >
          <div
            className="m-5 lg:w-2/4 sm:w-full px-4 rounded"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.1)",
            }}
          >
            <h1 className="  text-4xl rounded-b-lg py-1 mb-4 text-gray-800 text-pixel ">
              {detail.name}
            </h1>
            <div className="grid grid-cols-2  gap-6 ">
              <div>
                <h2 className="text-pixel text-lg text-gray-700">
                  Habilidades
                </h2>
                {detail.abilities.map((a) => (
                  <p className="pl-3 text-pixel text-gray-600">
                    {a.ability.name}
                  </p>
                ))}
              </div>
              <div>
                <h2 className="text-pixel text-lg text-gray-700">Tipo</h2>
                {detail.types.map((t) => (
                  <p className="pl-3 text-pixel text-gray-600">{t.type.name}</p>
                ))}
              </div>
              <div>
                <h2 className="text-pixel text-lg text-gray-700">Peso</h2>

                <p className="pl-3 text-pixel text-gray-600">{detail.weight}</p>
              </div>
            </div>
          </div>
          <ColorExtractor getColors={getColors}>
            <img
              className="h-[260px] m-5 xs:h-[100px]"
              src={detail?.sprites.other["official-artwork"].front_default}
            />
          </ColorExtractor>
        </div>
      )}
    </div>
  );
};

export default Detail;
