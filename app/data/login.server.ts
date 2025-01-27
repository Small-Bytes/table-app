import { sql } from "~/db.server";

export async function validateLogin(username, password) {
  try {
    console.log(username);

    const selectQuery = 'SELECT * FROM Users WHERE username = $1';
    const result = await sql(selectQuery, [username]);
console.debug(result);
console.log(result);
    // Kontrollera om användaren finns
    if (result.length === 0) {
      return null; // Användaren finns inte
    }

    let user = result[0];

    // Kontrollera lösenord (utan kryptering för nu)
    if (user.password !== password) {
      return null; // Lösenordet är fel
    }

    // Returnera användaruppgifter om inloggningen lyckas
    return user;
  } catch (error) {
    console.error("Error validating login:", error);
    throw new Error("Database query failed");
  }
}
