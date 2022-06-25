import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [states, setStates] = useState([{}]);
  const [statesInfo, setStatesInfo] = useState("");
  const [search, setSearch] = useState("");
  const [toggleStatesList, setToggleStatesList] = useState("false");

  useEffect(() => {
    axios.get("https://danepubliczne.imgw.pl/api/data/synop").then((response) => {
      setStates(response.data);
    });
  }, []);

  const inputSearchStation = (event) => {
    if (event.key === "Enter") {
      const capitalizeFirstLetter = search.charAt(0).toUpperCase() + search.slice(1);
      let findState = states.find(({ stacja }) => stacja === capitalizeFirstLetter);
      if (findState) {
        setStatesInfo(findState);
      }
    }
  };

  function buttonSearchStation() {
    const capitalizeFirstLetter = search.charAt(0).toUpperCase() + search.slice(1);
    let findState = states.find(({ stacja }) => stacja === capitalizeFirstLetter);
    if (findState) {
      setStatesInfo(findState);
    }
  }

  function handleInputChange(event) {
    setSearch(event.target.value);
  }

  return (
    <div className="App">
      <header className="App-header">
        <input
          type="text"
          onChange={handleInputChange}
          onKeyPress={inputSearchStation}
          placeholder="wpisz nazwę miasta"
        ></input>
        <button className="Search-button" onClick={buttonSearchStation}>
          Szukaj
        </button>
        <br></br>
        <button onClick={() => setToggleStatesList("true")} className="ShowStatesList">
          Lista stacji
        </button>
      </header>
      <div className="Main-container" onClick={() => setToggleStatesList("false")}>
        <div className="Left-info">
          <p className="City">
            <i>{statesInfo.stacja}</i>
          </p>
          <p>Data pomiaru</p>
          <p>
            {statesInfo.data_pomiaru}{" "}
            {statesInfo.godzina_pomiaru ? statesInfo.godzina_pomiaru + ":00" : "Nieznane"}
          </p>
          <p>Temperatura</p>
          <p className="Temp">
            {statesInfo.temperatura ? Math.round(statesInfo.temperatura) + "°C" : "Nieznane"}
          </p>
        </div>

        {toggleStatesList === "true" ? (
          <div className="State-list">
            {states.map((state) => {
              return (
                <li
                  key={state.id_stacji}
                  onClick={() => {
                    setStatesInfo(state);
                  }}
                >
                  {" "}
                  {state.stacja}
                </li>
              );
            })}
          </div>
        ) : (
          ""
        )}

        <div className="Right-info">
          <p>Ciśnienie</p>
          <p>{statesInfo.cisnienie ? Math.round(statesInfo.cisnienie) + " hPa" : "Nieznane"}</p>
          <p>Suma opadów</p>
          <p>{statesInfo.suma_opadu ? statesInfo.suma_opadu + " m²" : "Nieznane"}</p>
        </div>
      </div>

      <div className="Footer">
        <div>
          <p>{statesInfo.predkosc_wiatru ? Math.round(statesInfo.predkosc_wiatru) + "0 km/h" : "Nieznane"}</p>
          <p>Prędkość wiatru</p>
        </div>
        <div>
          <p>{statesInfo.kierunek_wiatru ? Math.round(statesInfo.kierunek_wiatru) + " °" : "Nieznane"}</p>
          <p>Kierunek wiatru</p>
        </div>
        <div>
          <p>
            {statesInfo.wilgotnosc_wzgledna ? Math.round(statesInfo.wilgotnosc_wzgledna) + " %" : "Nieznane"}
          </p>
          <p>Wilgotność</p>
        </div>
      </div>
    </div>
  );
}

export default App;
