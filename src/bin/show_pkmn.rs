extern crate diesel;

use hello_rust::models::*;
use self::diesel::prelude::*;
use hello_rust::establish_connection;

fn main() {
    use hello_rust::schema::pkmn::dsl::*;

    let connection = establish_connection();
    let results = pkmn
        .limit(5)
        .load::<PokeTest>(&connection)
        .expect("Error loading posts");

    println!("Displaying {} pkmn", results.len());
    for pk in results {
        println!("{}", pk.id);
        println!("----------\n");
        println!("{}", pk.name);
    }
}
