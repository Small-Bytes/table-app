import { sql } from "~/db.server";

export async function getRecentGames(username) {
  // const query = `
  //   SELECT g.playedAt, gt.gameName, gt.typeOfGame, p.nickname AS opponentNickname, r.isWinner
  const query = `
    SELECT g.playedAt, gt.gameName, gt.typeOfGame, r.isWinner
    FROM Games g
    JOIN GameTypes gt ON g.gameTypeId = gt.gameTypeId
    JOIN Participants p1 ON g.gameId = p1.gameId
    JOIN Participants p2 ON g.gameId = p2.gameId AND p1.playerId != p2.playerId
    JOIN Results r ON g.gameId = r.gameId AND r.playerId = p1.playerId
    WHERE p1.playerId = (
      SELECT playerId FROM Players WHERE userId = (SELECT userId FROM Users WHERE username = $1)
    )
    ORDER BY g.playedAt DESC
    LIMIT 5;
  `;
  const result = await sql(query, [username]);
  return result;
}

export async function getAllResults() {
  const query = `
    SELECT p.nickname, ps.totalGames, ps.totalWins, ps.winPercentage
    FROM PlayerStatistics ps
    JOIN Players p ON ps.playerId = p.playerId
    ORDER BY ps.winPercentage DESC;
  `;
  const result = await sql(query);
  return result;
}

export async function getFavoriteGames(username) {
  const query = `
    SELECT gt.gameName, gt.typeOfGame, COUNT(g.gameId) AS totalPlayed
    FROM Games g
    JOIN GameTypes gt ON g.gameTypeId = gt.gameTypeId
    JOIN Participants p ON g.gameId = p.gameId
    WHERE p.playerId = (
      SELECT playerId FROM Players WHERE userId = (SELECT userId FROM Users WHERE username = $1)
    )
    GROUP BY gt.gameName, gt.typeOfGame
    ORDER BY totalPlayed DESC
    LIMIT 5;
  `;
  const result = await sql(query, [username]);
  return result;
}
