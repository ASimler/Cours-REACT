import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";

// Axios permet de faire des fetch plus rapides et transforme directement les données en fichiers exploitables : plus besoin du res.json()

const Countries = () => {
  const [data, setData] = useState([]);
  const [rangeValue, setRangeValue] = useState(36);

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
      </ul>
      <ul>
        {data.slice(0, rangeValue).map((country, index) => (
          <Card key={index} country={country} />
        ))}
      </ul>
      {/* On crée un composant enfant de countries qui sera "card". Or card ne connait pas les données des pays, ils faut donc les lui transmettre en passant le country en paramètre lors du motage du composant et en destructurant country dans le paramètre du composant Card.js */}
    </div>
  );
};

export default Countries;
