import * as React from "react"
import * as ReactDOM from "react-dom"
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Link,
    HashRouter,
    BrowserRouter
  } from "react-router-dom";

// Components
import { Hello } from './components/Demo.Hello'
import { PokeTile } from './components/pokeTile'
import { PkmnNameTile } from './components/tileName'
import { Pokedex } from './components/pokedex'

// Styles
import './assets/sass/module.scss'

ReactDOM.render(<BrowserRouter><Pokedex /></BrowserRouter>, document.getElementById('root'))
/*
ReactDOM.render(
    <Router>
        <div>
            <Link to="/pokedex">Pokedex</Link>
        </div>
    </Router>

, document.getElementById('root')
)
*/
//ReactDOM.render(<PkmnNameTile />, document.getElementById('root'))