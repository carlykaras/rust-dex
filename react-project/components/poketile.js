/*
<script>
    fetch(new Request("/pokemon/pikachu"))
        .then(response => {
            console.log(response);
            window.thestuff = response;
    })
</script>
*/

'use strict';
import {PkmnNameTile} from "../tileName"

export class PokeTile extends React.Component {
    render() {
        return (
            <PkmnNameTile />
        )
    }
}