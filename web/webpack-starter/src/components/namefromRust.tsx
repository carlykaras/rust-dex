import * as React from "react";

interface Pokemon {
    isLoaded: boolean;
    //pkmnid: number;
    pkmnname: string;
}

export class PkmnName extends React.Component{
    state = {
            isLoaded: false,
            //pkmnid: 0,
            pkmnname: ""
    }

    componentDidMount(){
      console.log("Mounting");
      this.fetchData()
          .then((pkmn: any) => {
              this.setState({
                  isLoaded: true,
                  pkmnname: pkmn[0].name
              })
          });
      console.log("Mounted");
    }

  fetchData() {
      const url = "http://localhost:8000/api/pokemon";
      return fetch(url)
          .then(response => {
              return response.json();
          })     
  }

    render() {
      /*
        if (!this.state.isLoaded) {
            return <div>Loading...</div>;
          } 
        else {
            */
            return (
                <ul>
                    {this.state.pkmnname}
                </ul>
            )
          }
    //}
}

export default PkmnName;