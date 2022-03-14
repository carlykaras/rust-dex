#![feature(decl_macro)]
use rocket_contrib::serve::StaticFiles;
use serde::{Serialize, Deserialize};

use std::error::Error;
use std::fs::File;
use std::io::BufReader;
use std::path::Path;

#[macro_use] extern crate rocket;

type PkmnList = Vec<PokData>; 

#[derive(Serialize, Deserialize, Debug)]
struct PokData {
    name: String,
    sprite: String,
    locations: Vec<String>,
    types: Vec<String>
}

fn read_pok_from_file(path: &str) -> Result<PkmnList, Box<dyn Error>> {
    let path = Path::new(path);
    println!("{:?}", path);
    // Open the file in read-only mode with buffer.
    let file = File::open(path)?;
    let reader = BufReader::new(file);

    // Read the JSON contents of the file as an instance of `User`.
    let mut u: PkmnList = serde_json::from_reader(reader)?;

    // Sorts the list of pokemon by name
    u.sort_by(|a, b| a.name.cmp(&b.name));
    // Return the `User`.
    Ok(u)
}

fn read_loc<'p>(input_location: String, P: &'p Vec<PokData>) -> Vec<&'p PokData> {
    let matching_pokemon: Vec<&PokData> = P.iter().filter(|PokData| {
        return PokData.locations.iter().any(|location| location.eq(&input_location));
    }).collect();
    return matching_pokemon;
}

#[get("/<locname>")]
fn getmon(locname: String) -> String {
    let pkmn = read_pok_from_file("json/list2.json").unwrap();
    let pokloc = read_loc(locname, &pkmn);

    // This actually prints the JSON on the page
    if let Ok(locok) = serde_json::to_string_pretty(&pokloc) {
        locok
    } else {
        String::from("{}")
    }
}

#[get("/<pokname>")]
fn findpok(pokname: String) -> String {
    let pkmn = read_pok_from_file("json/list2.json").unwrap();
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
    let pkmnlist = read_pok_from_file("json/list2.json").unwrap(); 
    println!("{}", format!("{:#?}", pkmnlist));
    rocket::ignite()
        .mount("/api/pokemon", routes![findpok])
        .mount("/api/locations", routes![getmon])
        .mount("/", StaticFiles::from(concat!(env!("CARGO_MANIFEST_DIR"), "/web/webpack-starter/dist")))
        .launch();
}
