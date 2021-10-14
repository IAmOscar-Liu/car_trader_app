import { openDB } from "./openDB";
import { Make } from "../api/Make";

export async function getMakes() {
  const db = await openDB();
  const makes = await db.all<Make[]>(
    `SELECT make, count(*) as count
        FROM car
        GROUP BY make`
  );

  return makes;
}
