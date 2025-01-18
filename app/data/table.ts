import { sql } from "~/db.server";

/**
 * Adds or updates a score for a given name in the tableData array.
 * @param {number} playerid - The name associated with the score.
 * @param {number} score - The score to add or update.
 * @param {string} tableId - The table id to update.

 */
export async function AddPoints (playerid, score, tableId) {
    if (typeof playerid !== 'number' || isNaN(playerid)) {
        console.error('Invalid input: PlayerId must be a valid number.');
        return;
    }
    if (typeof score !== 'number' || isNaN(score)) {
        console.error('Invalid input: Score must be a valid number.');
        return;
    }

    if (typeof tableId !== 'string' || !tableId) {
        console.error('Invalid input: tableId must be a string with value.');
        return;
    }

    const table = await getTableById(tableId);
    var data = table.data;
    var players = data.players;
    // Check if the entry already exists
    const existingEntry = players.find(entry => entry.id === playerid);

    if (existingEntry) {
        // Update the score if the entry exists
        var sc = existingEntry.score + score; 
        existingEntry.score = sc;
        console.log(`Updated ${playerid}'s score to ${sc}.`);
    } else {
        console.log(`Failed to add score. Player with id ${playerid} is missing.`);
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
    const sqlResult = await sql`SELECT * FROM tableResults`;
    var tablesWithKey = sqlResult.filter((res) => res.id == resultid);

    if (!tablesWithKey || tablesWithKey.length === 0) {
        console.error('Invalid id: Could not find results');
        return;
    }
      
    var table = tablesWithKey[0];

    return table.players;
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