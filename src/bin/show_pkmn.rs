#![feature(decl_macro)]
extern crate diesel;

use rocket_contrib::serve::StaticFiles;
use serde::{Serialize, Deserialize};
use serde_json::json;
use serde::ser::StdError;

use std::error::Error;
use std::fs::File;
use std::io::BufReader;
use std::path::Path;

use hello_rust::models::*;
use self::diesel::prelude::*;
use hello_rust::establish_connection;

#[macro_use] extern crate rocket;

fn getlist() -> Vec<hello_rust::models::PokeTest> {
    use hello_rust::schema::pkmn::dsl::*;

    let connection = establish_connection();
    let results = pkmn
        .load::<PokeTest>(&connection)
        .expect("Error loading posts");
    
    println!("Displaying {} pkmn", results.len());
    for pk in &results {
        println!("{}", pk.id);
        println!("----------\n");
        println!("{}", pk.name);
        println!("----------\n");
        println!("{:?}", pk.abilities);
    }
    println!("{:#?}", results);
    return results;
}

#[get("/pokemon")]
fn printlist() -> String {
    let newlist = getlist();
    let testlist = serde_json::to_string_pretty(&newlist);
    return match testlist {
        Ok(pkmn) => pkmn,
        Err(err) => String::from("{}")
    };
}

#[get("/<pokname>")]
fn findpok(pokname: String) -> String {
    let pkmn = getlist();
    // Searches for the pokemon by name that you entered
    
    let i = match pkmn.binary_search_by(|p| p.name.cmp(&pokname)) {
        Ok(ind) => ind, 
        Err(_) => 9999
    };
    println!("{:#?}", i);
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
    rocket::ignite()
        .mount("/api", routes![printlist])
        .mount("/api/pokemon", routes![findpok])
        .mount("/", StaticFiles::from(concat!(env!("CARGO_MANIFEST_DIR"), "/web/webpack-starter/dist")))
        .launch();
}
