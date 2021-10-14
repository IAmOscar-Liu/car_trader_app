import { Make } from "./Make";
import { Model } from "./Model";

export interface SearchProps {
  makes: Make[];
  models: Model[];
  singleColumn?: boolean;
}


