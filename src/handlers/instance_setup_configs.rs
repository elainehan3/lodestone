use std::collections::HashSet;

use axum::routing::get;
use axum::Router;
use axum::{extract::Path, Json};

use crate::implementations::minecraft::versions::MinecraftVersions;
use crate::prelude::GameType;

use crate::implementations::minecraft;
use crate::traits::Error;

pub async fn get_available_games() -> Json<HashSet<GameType>> {
    Json(HashSet::from([GameType::Minecraft]))
}

pub async fn get_available_flavours(Path(game_type): Path<GameType>) -> Json<HashSet<String>> {
    match game_type {
        GameType::Minecraft => Json(HashSet::from([
            minecraft::Flavour::Vanilla.to_string(),
            minecraft::Flavour::Fabric.to_string(),
        ])),
    }
}

pub async fn get_minecraft_versions(
    Path(flavour): Path<minecraft::Flavour>,
) -> Result<Json<MinecraftVersions>, Error> {
    Ok(Json(match flavour {
        minecraft::Flavour::Vanilla => minecraft::versions::get_vanilla_versions().await?,
        minecraft::Flavour::Fabric => minecraft::versions::get_fabric_versions().await?,
        _ => unimplemented!(),
    }))
}

pub fn get_instance_setup_config_routes() -> Router {
    Router::new()
        .route("/games", get(get_available_games))
        .route("/games/:game_type/flavours", get(get_available_flavours))
        .route(
            "/games/minecraft/flavours/:flavour/versions",
            get(get_minecraft_versions),
        )
}
