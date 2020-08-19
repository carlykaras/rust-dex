#![feature(decl_macro)]
use rocket_contrib::serve::StaticFiles;
use serde::{Serialize, Deserialize};

use std::error::Error;
use std::fs::File;
use std::io::BufReader;
use std::path::Path;

#[macro_use] extern crate rocket;

type Pkmn = Vec<Pok>; 

#[derive(Serialize, Deserialize, Debug)]
struct Pok {
    name: String,
    sprite: String,
    locations: Vec<String>,
    types: Vec<String>
}

// struct Types { typeA: string, typeB: string }

fn read_pok_from_file(path: &str) -> Result<Pkmn, Box<Error>> {
    let path = Path::new(path);
    println!("{:?}", path);
    // Open the file in read-only mode with buffer.
    let file = File::open(path)?;
    let reader = BufReader::new(file);

    // Read the JSON contents of the file as an instance of `User`.
    let mut u: Pkmn = serde_json::from_reader(reader)?;

    // Sorts the list of pokemon by name
    u.sort_by(|a, b| a.name.cmp(&b.name));
    // Return the `User`.
    Ok(u)
}

/*
#[get("/<locname>")]
fn getmon(locname: String) -> String {
    let pkmn = read_pok_from_file("./assets/list2.json").unwrap();
    /*
    for x in pkmn.locations.iter() {
        println!("> {}", x);
    }
    */

    let mut pokloc = pkmn.iter().filter(|pokemon| pokemon.locations.iter().any(|&l| l == locname));

    // Searches for the pokemon by name that you entered
    //let i = pkmn.binary_search_by(|p| p.locations.cmp(&locname)).unwrap_or(9999);
    /*
    let i = pkmn.iter().filter(|p| p.locations.cmp(&locname));
    // Error handling
    if i == 9999 {
        return String::from("{}");
    }
    */
    // This actually prints the JSON on the page for pkmn[i]
    return pokloc;
    
}
*/

#[get("/<pokname>")]
fn findpok(pokname: String) -> String {
    let pkmn = read_pok_from_file("./assets/list2.json").unwrap();
    // Searches for the pokemon by name that you entered
    let i = pkmn.binary_search_by(|p| p.name.cmp(&pokname)).unwrap_or(9999);
    // Error handling
    if i == 9999 {
        return String::from("{}");
    }
    // This actually prints the JSON on the page for pkmn[i]
    if let Ok(poke) = serde_json::to_string_pretty(&pkmn[i]) {
        poke
    } else {
        String::from("{}")
    }
}

fn main() {
    let pkmn = read_pok_from_file("./assets/list2.json").unwrap();
    println!("{}", format!("{:#?}", pkmn));
    rocket::ignite()
        .mount("/pokemon", routes![findpok])
       // .mount("/location", routes![getmon])
        .mount("/", StaticFiles::from(concat!(env!("CARGO_MANIFEST_DIR"), "/public")))
        .launch();
}