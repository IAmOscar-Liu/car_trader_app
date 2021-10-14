import { openDB } from "./openDB";
import { Model } from "../api/Model";

export async function getModels(make: string) {
  const db = await openDB();
  const model = await db.all<Model[]>(
    `
     SELECT model, count(*) as count
     FROM car
     WHERE make = @make
     GROUP BY model 
    `,
    { "@make": make }
  );

  return model;
}
