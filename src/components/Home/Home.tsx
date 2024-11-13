import { useEffect, useState } from "react";
import axios from "axios";
import { URL } from "../../contanst";

const Home = () => {
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [pokemon, setPokemon] = useState([]);
  const [url, setUrl] = useState<string>(`${URL}?offset=0&limit=100`);
  const [next, setNext] = useState<null | string>(null);
  const [previous, setPrevious] = useState<null | string>(null);
  const [go, setGo] = useState<null | string>(`${URL}?offset=0&limit=100`);

  useEffect(() => {
    setLoading(true);
    axios
      .get(url)
      .then((response) => {
        const { results, next, previous } = response.data;
        setPokemon(results);
        setNext(next);
        setPrevious(previous);
        console.log("NEXT", next, "PREVIOUS", previous);
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

  return (
    <>
      <div className="bg-gray-50 h-svh w-svw py-6">
        <div className="container m-auto bg-white rounded-md p-4">
          <div className="border rounded-md shadow-sm flex flex-col justify-between">
            {" "}
            {loading && (
              <svg
                className="animate-spin h-5 w-5 mr-3 ..."
                viewBox="0 0 24 24"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path d="M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z" />
                </svg>
              </svg>
            )}
            <div className="  flex flex-row justify-between w-full">
              <div className="ml-3 w-56 p-1 m-2 ">Mostranto 1 de 1302</div>
              <div className="">
                <button
                  className="border rounded-md ml-3 w-32 p-1 m-2"
                  onClick={() => setGo(previous)}
                >
                  Previo
                </button>
                <button
                  className="border rounded-md ml-3 w-32 p-1 m-2"
                  onClick={() => setGo(next)}
                >
                  Siguiente
                </button>
              </div>
            </div>
            <div>
              <pre>{JSON.stringify(pokemon, null, 2)}</pre>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
