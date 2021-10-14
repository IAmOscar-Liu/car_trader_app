import { NextApiRequest, NextApiResponse } from "next";
import { getAsString } from "../../utils/getAsString";
import { getModels } from "../../database/getModels";

export default async function models(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const make = getAsString(req.query.make);

  const model = await getModels(make);

  res.json(model);
}
