'use strict';
const f = React.createElement;
var testname;

class PkmnNameTile extends React.Component {
    constructor(props) {
        super(props);
    }

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
}

const domContainer2 = document.querySelector('#poke_name');
ReactDOM.render(f(PkmnNameTile), domContainer2);

/*

*/