import { useState } from "react";
import "./App.css";
import sites from "./site";
import axios from "axios";
import { generateScreenshotApiUrl } from "screenshotmachine";

function App() {
  const [site, setSite] = useState({});
  const [ready, setReady] = useState(false);
  // const [dimension, setDimension] = useState(
  //   `${window.innerWidth}x${window.innerHeight}`
  // );
  const customerKey = import.meta.env.VITE_API_KEY;

  const getImage = async (link, dimension) => {
    const secretPhrase = "";
    const options = {
      url: link,
      dimension: "1366x760",
      device: "desktop",
      format: "png",
      cacheLimit: "0",
      delay: "200",
      zoom: "100",
    };

    try {
      const resp = generateScreenshotApiUrl(customerKey, secretPhrase, options);
      console.log(resp);
      return resp;
    } catch (e) {
      console.log("ERROR", e);
    }
  };

  const getRandom = async () => {
    const len = sites.length;
    const randomNumber = Math.floor(Math.random() * len);
    const site = sites[randomNumber];
    const image = (await getImage(site.link, dimension)) || "";
    console.log("imagen en getrandom", image);
    site.image = image;
    setSite(site);
    setReady(true);
  };

  return (
    <main>
      <header>
        <h1>Wipeout! </h1>
        <p>Get a random developers project!</p>
      </header>

      <div className="button">
        <button onClick={() => getRandom()}>Get Random!</button>
      </div>

      {ready && (
        <div className="result">
          <h2>{site.title}</h2>

          <a href={site.link} target="_blank">
            <button>Go to site!</button>
          </a>

          <figure>
            <img
              src={
                site.image ||
                "https://cdn4.iconfinder.com/data/icons/ui-beast-4/32/Ui-12-512.png"
              }
              alt={`${site.title} home image`}
            />
          </figure>
        </div>
      )}
    </main>
  );
}

export default App;
