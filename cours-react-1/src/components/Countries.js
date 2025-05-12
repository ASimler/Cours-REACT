import React, { useEffect } from "react";
import axios from "axios";

const Countries = () => {
  // Le useEffect se joue lorsque le composant est monté c'est à dire créé
  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((res) => console.log(res));
  }, []);

  return (
    <div className="countries">
      <h1>COUNTRIES</h1>
    </div>
  );
};

export default Countries;
