import { useState } from "react";
import "./App.css";
import sites from "./site";

function App() {
  const [site, setSite] = useState({});
  const [ready, setReady] = useState(true);

  function getRandom() {
    const len = sites.length;
    const randomNumber = Math.floor(Math.random() * len);
    setSite(sites[randomNumber]);
    setReady(true);
  }

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
            <img src={site.image} alt={`${site.title} home image`} />
          </figure>
        </div>
      )}
    </main>
  );
}

export default App;
