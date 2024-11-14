import { useEffect, useState } from "react";
import axios from "axios";
import { URL } from "../../contanst";
import Card from "../Card/Card";
import { FaArrowRight, FaArrowLeftLong } from "react-icons/fa6";
import { FaSpinner } from "react-icons/fa";
import Detail from "../Detail/Detail";
const Home = () => {
  const [loading, setLoading] = useState(false);
  const [pokemon, setPokemon] = useState([]);
  const [url, setUrl] = useState<string>(`${URL}?offset=0&limit=8`);
  const [next, setNext] = useState<null | string>(null);
  const [previous, setPrevious] = useState<null | string>(null);
  const [go, setGo] = useState<null | string>(`${URL}?offset=0&limit=8`);
  const [detail, setDetail] = useState<null | number>(null);

  useEffect(() => {
    console.log(detail);
  }, [detail]);

  useEffect(() => {
    setLoading(true);
    axios
      .get(url)
      .then((response) => {
        const { results, next, previous } = response.data;
        setPokemon(results);
        setNext(next);
        setPrevious(previous);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [url]);

  useEffect(() => {
    if (go !== null) {
      setUrl(go);
    }
  }, [go]);

  const renderCards = (pokemon: any) =>
    pokemon.map((p: any) => (
      <Card pokemon={p} key={p["url"]} action={setDetail} />
    ));

  const renderLoading = () => (
    <div className="animate-spin m-auto text-2xl ">
      <FaSpinner />
    </div>
  );

  return (
    <>
      <div className="bg-gray-100 h-screen w-svw py-6 justify-center flex">
        <div className="container m-auto bg-white rounded-md p-4 shadow-lg">
          <Detail />
          <div className=" rounded-md flex flex-col justify-between">
            <div className="  flex flex-row justify-between w-full">
              <button
                className="border rounded-md  p-3 mb-4 text-gray-500"
                onClick={() => setGo(previous)}
              >
                <FaArrowLeftLong />
              </button>
              <button
                className="border rounded-md  p-3 mb-4 text-gray-500 "
                onClick={() => setGo(next)}
              >
                <FaArrowRight />
              </button>
            </div>

            {loading ? (
              <div className="h-[400px] my-16 justify-center align-middle flex ">
                {renderLoading()}
              </div>
            ) : (
              <div className="grid grid-cols-4 gap-4 ">
                {renderCards(pokemon)}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
