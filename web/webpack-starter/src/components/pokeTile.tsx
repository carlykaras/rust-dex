import * as React from "react";

import {PkmnNameTile} from "./tileName"
import {Pokemon, AllPokemon} from "./model"
import { ProgressPlugin } from "webpack";

interface PkmnRowProps {
    pokemon: Pokemon
}

function PkmnRow() { 
    const prow = (
        <ul>
            {this.state.pokemon.map((pkmn: any) => 
                <li key = {pkmn.id}>{pkmn.name}</li>
            )}
        </ul>
    )
    return (
        <div id = "pkmnname">
            {prow}
        </div>
    )
}

interface PokeTileState {
    pokemon: Array<Pokemon>
}

interface PokeTileProps {}

export class PokeTile extends React.Component<PokeTileProps, PokeTileState> {

    constructor(props: PokeTileProps) {
        super(props);
        this.state = {
            pokemon: []
        }
    }

    fetchData() {
        console.log('trying to fetch');
        const url = "http://localhost:8000/api/pokemon";
        
        fetch(url).then(response => response.json())
            .then((pkmn: any) => {
                this.setState({
                    pokemon: pkmn
                })
            });
    }
    
    componentDidMount() {
        console.log("Mounting");
        this.fetchData();    
        console.log(this.state.pokemon);    
    } 

    render() {
        return (
            
            <div id = "pokelist">
                <ul>
                    {this.state.pokemon.map((pkmn: any) => 
                    <li key = {pkmn.id}>{pkmn.name}, {pkmn.number}, {pkmn.abilities}</li>
                     )}
                </ul>
            </div>
            
        )
        
    }
    
}

export default PokeTile;