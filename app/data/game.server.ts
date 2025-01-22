import { sql } from "~/db.server";

export async function getLastGames(tableId) {
    const selectQuery = 'SELECT * FROM gameTypes WHERE gamename = $1';
    const selectResult = await sql(selectQuery, [name]);

    if (!selectResult || selectResult.length === 0) {
        console.error('Invalid id: Could not find results');
        return;
    }
      
    var gameType = selectResult[0];
    console.debug(gameType);
    return gameType;
}

export async function addGameType(name) {
    console.log(name);
  
    if (!name)
    {
      console.error('Invalid input: name must be set');
      return;
    }
  
      const insertQuery = `
          INSERT INTO gameTypes (gamename, typeofgame)
          VALUES ($1, $2)`;
  
      await sql(insertQuery, [name, 'default']);
  }

  export async function getGameTypeByName(name) {
    const selectQuery = 'SELECT * FROM gameTypes WHERE gamename = $1';
    const selectResult = await sql(selectQuery, [name]);

    if (!selectResult || selectResult.length === 0) {
        console.error('Invalid id: Could not find results');
        return;
    }
      
    var gameType = selectResult[0];
    console.debug(gameType);
    return gameType;
}