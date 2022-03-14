table! {
    abilities (ab_id) {
        name -> Nullable<Varchar>,
        description -> Nullable<Text>,
        ab_id -> Int4,
    }
}

table! {
    pkmn (pkmn_id) {
        pkmn_id -> Int4,
        name -> Varchar,
        number -> Int4,
        ab_array -> Array<Int4>,
    }
}

joinable!(abilities -> pkmn (ab_id));
allow_tables_to_appear_in_same_query!(
    abilities,
    pkmn
);
