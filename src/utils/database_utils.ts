import Database from "bun:sqlite";

export function loadDatabase(): Database {
    let db = new Database('./db/discord_db.sqlite', { create: true })
    
    // Create the table if it does not already exist
    db.query(`
        CREATE TABLE IF NOT EXISTS requests
        (id INTEGER PRIMARY KEY AUTOINCREMENT,
        user TEXT, request TEXT)
    `).run();

    return db
}