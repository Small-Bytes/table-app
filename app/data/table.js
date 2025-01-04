// Initialize an array of objects to store the data
export let players = [
    { id: "1", name: "Seb", score: 100 },
    { id: "2", name: "Robert", score: 30 },
    { id: "3", name: "Kvist", score: 0 },
  ];

/**
 * Adds or updates a score for a given name in the tableData array.
 * @param {number} playerid - The name associated with the score.
 * @param {number} score - The score to add or update.
 */
export function AddPoints(playerid, score) {
    if (typeof playerid !== 'number' || isNaN(playerid)) {
        console.error('Invalid input: PlayerId must be a valid number.');
        return;
    }
    if (typeof score !== 'number' || isNaN(score)) {
        console.error('Invalid input: Score must be a valid number.');
        return;
    }

    // Check if the entry already exists
    const existingEntry = players.find(entry => entry.id === playerid);

    if (existingEntry) {
        // Update the score if the entry exists
        existingEntry.score = score;
        console.log(`Updated ${playerid}'s score to ${score}.`);
    } else {
        // Add a new entry if it doesn't exist
        players.push({ playerid, score });
        console.log(`Added ${playerid} with a score of ${score}.`);
    }
}