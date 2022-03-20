import * as React from "react";
import {Pokemon, AllPokemon} from "./model"

export function fetchData() {
    console.log('trying to fetch');
    const url = "http://localhost:8000/api/pokemon";
    
    fetch(url).then(response => response.json())
    .then(data => console.log(data));
    
}