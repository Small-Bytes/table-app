import { sql } from "~/db.server";
import { generateKey } from "./generateSafeUrlKey";

/**
 * Adds or updates a score for a given name in the tableData array.
 * @param {number} playerid - The name associated with the score.
 * @param {number} game - The score to add or update.
 * @param {string} tableId - The table id to update.

 */
export async function AddGameAndWinner (playerid, game, tableId) {
    if (typeof playerid !== 'number' || isNaN(playerid)) {
        console.error('Invalid input: PlayerId must be a valid number.');
        return;
    }
    if (typeof game !== 'string' || !game) {
        console.error('Invalid input: Game must be a string with value.');
        return;
    }

    if (typeof tableId !== 'string' || !tableId) {
        console.error('Invalid input: tableId must be a string with value.');
        return;
    }

    const table = await getTableById(tableId);
    var data = table.data;
    var history = data.history;
    var players = data.players;
    // Check if the entry already exists
    const existingEntry = players.find(entry => entry.id === playerid);

    if (existingEntry) {
        // Update the score if the entry exists
        var sc = existingEntry.score + 1; 
        existingEntry.score = sc;
        console.log(`Updated ${playerid}'s score to ${sc}.`);
    } else {
        console.log(`Failed to add score. Player with id ${playerid} is missing.`);
    }

    console.log("history " + history);
    if (!history || history === null)
    {
        history = [game];
        data.history = history;
    }
    else
    {
        history.push(game);
    }

    const updateQuery = `
        UPDATE tableResults
        SET data = $1
        WHERE id = $2
        RETURNING *`;

      console.log(data);
      const updateResult = await sql(updateQuery, [JSON.stringify(data), tableId]);
      console.log('Updated Entity:', updateResult[0]);

      // TODO Only returning this because no better way today of landing back at table. Should exist better solution
      return table.shareablekey;
}

export async function addNewTable(players) {
  console.log(players);

  if (!players || players.length === 0)
  {
    console.error('Invalid input: players must be array with values');
    return;
  }

    var sharableKey = generateKey({ source: 'TableForFriends', date: new Date().getUTCDate()});
    const insertQuery = `
        INSERT INTO tableResults (shareablekey, data)
        VALUES ($1, $2)
        RETURNING *`;

      console.log(players);
      const insertResult = await sql(insertQuery, [sharableKey, JSON.stringify(players)]);
      console.log('insert Entity:', insertResult[0]);

    return sharableKey;
}

export async function getPlayersById(resultid) {
    const table = await getTableById(resultid);
 
    if (!table)
        return [];

    return table.data.players;
}

export async function getTableById(resultid) {
    const selectQuery = 'SELECT * FROM tableResults WHERE id = $1';
    const selectResult = await sql(selectQuery, [resultid]);

    if (!selectResult || selectResult.length === 0) {
        console.error('Invalid id: Could not find results');
        return;
    }
      
    var table = selectResult[0];
    console.debug(table);
    return table;
}

export async function getTableBySharableKey(sharableKey) {
    const selectQuery = 'SELECT * FROM tableResults WHERE shareablekey = $1';
    const selectResult = await sql(selectQuery, [sharableKey]);

    if (!selectResult || selectResult.length === 0) {
        console.error('Invalid key: Could not find results');
        return;
    }
      
    var table = selectResult[0];
    return table;
}

export async function getPlayersBySharableKey(sharableKey) {
    const table = await getTableBySharableKey(sharableKey);

    if (!table)
        return [];

    return table.data.players;
}