import { SelectProps } from "@material-ui/core";
import { Model } from "./Model";

export interface ModelSelectProps extends SelectProps {
  name: string;
  models: Model[];
  make: string;
  initialMake: string;
}