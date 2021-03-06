import { openDB } from "./openDB";
import { getValueNumber } from "../utils/getValueNumber";
import { getValueStr } from "../utils/getValueStr";
import { CarModel } from "../api/car";
import { ParsedUrlQuery } from "querystring";

const mainQuery = `
    FROM car
    WHERE (@make is NULL OR @make = make)
    AND (@model is NULL OR @model = model)
    AND (@minPrice is NULL OR @minPrice <= price)
    AND (@maxPrice is NULL OR @maxPrice >= price)
`;

export async function getPaginatedCars(query: ParsedUrlQuery) {
  const db = await openDB();

  const page = getValueNumber(query.page) || 1;
  const rowsPerPage = getValueNumber(query.rowsPerPage) || 4;
  const offset = (page - 1) * rowsPerPage;

  const dbParams = {
    "@make": getValueStr(query.make),
    "@model": getValueStr(query.model),
    "@minPrice": getValueNumber(query.minPrice),
    "@maxPrice": getValueNumber(query.maxPrice),
  };

  const carsPromise = db.all<CarModel[]>(
    `SELECT * ${mainQuery} LIMIT @rowsPerPage OFFSET @offset`,
    {
      ...dbParams,
      "@rowsPerPage": rowsPerPage,
      "@offset": offset,
    }
  );

  const totalRowsPromise = db.get<{ count: number }>(
    `SELECT COUNT(*) as count ${mainQuery}`,
    dbParams
  );

  const [cars, totalRows] = await Promise.all([carsPromise, totalRowsPromise]);

  return { cars, totalPages: Math.ceil(totalRows.count / rowsPerPage) };
}
