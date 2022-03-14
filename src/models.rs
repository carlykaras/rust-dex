use serde::{Serialize, Deserialize};
use std::io::Read;

#[derive(Serialize, Deserialize, Queryable, Debug)]
pub struct Abilities {
    pub name: String,
    pub description: String,
    pub id: Vec<i32>
}

#[derive(Serialize, Deserialize, Queryable, Debug)]
pub struct PokeTest {
    pub id: i32,
    pub name: String,
    pub number: i32,
    pub abilities: Vec<i32>
}

