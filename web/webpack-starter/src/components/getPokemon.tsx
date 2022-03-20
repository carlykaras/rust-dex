import * as React from "react";
import {Pokemon, AllPokemon} from "./model"
import {
    Link,
    Outlet,
    useParams
  } from "react-router-dom";

interface PokeTileState {
    pokemon: Array<Pokemon>
}

interface PokeTileProps {}

export class GetPkmn extends React.Component<PokeTileProps, PokeTileState> {

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
                    {this.state.pokemon.map((pkmn:any) => (
                        <Link
                        style={{ display: "block", margin: "1rem 0" }}
                        to={`/pokedex/${pkmn.name}`}
                        key={pkmn.name}
                        >
                            {pkmn.name}
                        </Link>
                    ))}
                </ul>
                <Outlet />
            </div>
        )}
        
}

export default GetPkmn;