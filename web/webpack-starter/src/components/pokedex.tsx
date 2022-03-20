import * as React from "react"
import * as ReactDOM from "react-dom"
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    useParams 
  } from "react-router-dom";

import { GetPkmn } from './getPokemon'  
import PkEntries  from './pkentries'

function Pkdex() {
    return (
        <GetPkmn />
    )
}

function Home() {
    return (
        <div>
            Route test 1
            <Link to ="/pokedex">Pokedex</Link>
        </div>
    )
}

export class Pokedex extends React.Component {
    render() {
        return (
            <div>
                Testing
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/pokedex" element={<GetPkmn />} />
                        <Route path="/pokedex/:pokeName" element={<PkEntries />} />
                </Routes>
            </div>
            
        )
    }
}
//ReactDOM.render(<PkmnNameTile />, document.getElementById('root'))