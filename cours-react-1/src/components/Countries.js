import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";

// Axios permet de faire des fetch plus rapides et transforme directement les données en fichiers exploitables : plus besoin du res.json()

const Countries = () => {
  const [data, setData] = useState([]);
  const [rangeValue, setRangeValue] = useState(36);
  const [selectedRadio, setSelectedRadio] = useState("");
  const radios = ["Africa", "America", "Asia", "Europe", "Oceania"];

  // Le useEffect se joue lorsque le composant est monté c'est à dire créé
  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((res) => setData(res.data));
  }, []);

  // Voir l'implémentation de setData directement dans devtools components du plugin react devtools

  return (
    <div className="countries">
      <ul className="radio-container">
        <input
          type="range"
          min="1"
          max="250"
          defaultValue={rangeValue}
          onChange={(e) => {
            setRangeValue(e.target.value);
          }}
        />
        {/* Pour éviter de répéter 5 fois l'input : <input type="radio" id="afrique" />
        <label htmlFor="afrique"></label> 
        => */}
        {radios.map((continent) => (
          <li>
            <input
              type="radio"
              id={continent}
              name="contientRadio"
              checked={continent === selectedRadio}
              onChange={(e) => setSelectedRadio(e.target.id)}
            />
            <label htmlFor={continent}>{continent}</label>
          </li>
        ))}
        {/* le name du radio permet de les lier et de ne pas pouvoir tous les cocher */}
      </ul>
      {selectedRadio && (
        <button onClick={() => setSelectedRadio("")}>
          Annuler la recherche
        </button>
      )}
      <ul>
        {data
          .filter((country) => country.continents[0].includes(selectedRadio))
          .sort((a, b) => b.population - a.population)
          .slice(0, rangeValue)
          .map((country, index) => (
            <Card key={index} country={country} />
          ))}
      </ul>
      {/* On crée un composant enfant de countries qui sera "card". Or card ne connait pas les données des pays, ils faut donc les lui transmettre en passant le country en paramètre lors du motage du composant et en destructurant country dans le paramètre du composant Card.js */}
    </div>
  );
};

export default Countries;
