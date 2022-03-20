import * as React from "react";
import { useState } from 'react';

import { useParams } from "react-router-dom";
import {Pokemon, AllPokemon} from "./model"


function fetchData(pokeName: string) {

    console.log('trying to fetch');
    const url = `http://localhost:8000/api/pokemon/${pokeName}`;
    
    return fetch(url).then(response => response.json());

        
    /*
    return fetch(url)
        .then(response => response.json());
    */
}

function PkEntries() {
    const [pokemon, setPokemon]: [Pokemon, Function] = useState();
    let params = useParams();

    if (!pokemon) {
        fetchData(params.pokeName).then((pkmn: any) => {
            console.log(pkmn);
            setPokemon(pkmn);
        })
    }
    console.log(pokemon);
    if (pokemon) {
        return <div>Pokemon: {pokemon.name}, {pokemon.number}</div>
    } else {
        return <div>Loading</div>
    } 
    //return <div>Pokemon: {params.pokeName}</div>;
  }

export default PkEntries;