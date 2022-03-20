import * as React from "react";

interface Pokemon {
    name: string
}

export class PkmnNameTile extends React.Component{

    state = {
        name: "",
        number:""
    }

    // Set component state with results from fetchData()
    // Setting state will cause the component to rerender with the correct data

    componentDidMount(){
        console.log("Mounting");
        this.fetchData()
            .then((pkmn: any) => {
                this.setState({
                    name: pkmn.name,
                    number: pkmn.number
                })
            });
        console.log("Mounted");
      }

    fetchData() {
        const url = "http://localhost:8000/api/pokemon/Pikachu";
        return fetch(url)
            .then(response => {
                return response.json();
            })     
    }
    
    render() {
        return (
            <p>
                This is {this.state.name}
                <span> which is number {this.state.number}</span>
            </p>
        );
    }
}

export default PkmnNameTile;
