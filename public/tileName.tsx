'use strict';
/*
var newname = undefined;

function getName() {
    fetch(new Request("/pokemon/pikachu"))
            .then(response => {
                //testname.json().then(data => console.log(data.name));  
                testname.json().then(data => {
                    console.log(data.name);
                    testname = data.name;
                    console.log(testname);
                    return newname = testname;
                    //var pokename = document.createElement('p');
                })
            })
        
}
*/

export class PkmnNameTile extends React.Component{

    componentDidMount(){
        console.log("Mounting");
        let testname = this.fetchData();
        console.log("Mounted");
        return testname;
      }

    fetchData() {
        const url = "http://localhost:8000/pokemon/pikachu"
        return fetch(url)
            .then(response => {
                //testname.json().then(data => console.log(data.name));  
                testname.json().then(data => {
                    console.log(data.name);
                    testname = data.name;
                    console.log(testname);
                    return testname;
                    //var pokename = document.createElement('p');
                })
            })     
    }
    
    render() {
        return (
            console.log(this.testname.name)
            // <p>
            //     {this.fetchData().name}
            // </p>
        );
    }
    
/*
return fetch(new Request("/pokemon/pikachu"))

    render() {
        let pokename = document.createElement('p');
        fetch(new Request("/pokemon/pikachu"))
            .then(response => {
                //testname.json().then(data => console.log(data.name));  
                testname.json().then(data => {
                    console.log(data.name);
                    testname = data.name;
                    console.log(testname);
                    return testname;
                    //var pokename = document.createElement('p');
                })
            })
        console.log("Here is " + testname);
        return pokename.innerHTML = 'Name: ' + testname;
    }
    */
}

export default PkmnNameTile;
//ReactDOM.render(PkmnNameTile, document.getElementById('poke_name'));

/*

*/