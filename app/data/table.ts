import { sql } from "~/db.server";

/**
 * Adds or updates a score for a given name in the tableData array.
 * @param {number} playerid - The name associated with the score.
 * @param {number} score - The score to add or update.
 */
export async function AddPoints (playerid, score) {
    if (typeof playerid !== 'number' || isNaN(playerid)) {
        console.error('Invalid input: PlayerId must be a valid number.');
        return;
    }
    if (typeof score !== 'number' || isNaN(score)) {
        console.error('Invalid input: Score must be a valid number.');
        return;
    }

    var players = await getPlayersBySharableKey('origin');
console.log(players);
    // Check if the entry already exists
    const existingEntry = players.find(entry => entry.id === playerid);

    if (existingEntry) {
        // Update the score if the entry exists
        var sc = existingEntry.score + score; 
        existingEntry.score = sc;
        console.log(`Updated ${playerid}'s score to ${sc}.`);
    } else {
        // Add a new entry if it doesn't exist
        players.push({ playerid, score });
        console.log(`Added ${playerid} with a score of ${score}.`);
    }
}

export async function getPlayersById(resultid) {
    const sqlResult = await sql`SELECT * FROM tableResults`;
    var tablesWithKey = sqlResult.filter((res) => res.id == resultid);

    if (!tablesWithKey || tablesWithKey.length === 0) {
        console.error('Invalid id: Could not find results');
        return;
    }
      
    var table = tablesWithKey[0];

    return table.players;
}

export async function getPlayersBySharableKey(sharableKey) {
    const sqlResult = await sql`SELECT * FROM tableResults`;
// TODO Fix using key
    var tablesWithKey = sqlResult.filter((res) => res.shareablekey == 'original');

    if (!tablesWithKey || tablesWithKey.length === 0) {
        console.error('Invalid key: Could not find results');
        return;
    }
      
    var table = tablesWithKey[0];
console.debug(table);
    return table.data.players;
}

// export async function updatePlayerScore(players, id, score) {
//     const sqlResult = await sql`UPDATE tableResults SET DATA`;
// // TODO Fix using key
//     var tablesWithKey = sqlResult.filter((res) => res.shareablekey == 'original');

//     if (!tablesWithKey || tablesWithKey.length === 0) {
//         console.error('Invalid key: Could not find results');
//         return;
//     }
      
//     var table = tablesWithKey[0];
// console.debug(table);
//     return table.data.players;
// }