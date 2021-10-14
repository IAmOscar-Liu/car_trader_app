import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import { useField, useFormikContext } from "formik";
import { useEffect } from "react";
import useSWR from "swr";
import { Model } from "../api/Model";
import { ModelSelectProps } from "../api/ModelSelectProps";

export function ModelSelect({
  initialMake,
  models,
  make,
  ...props
}: ModelSelectProps) {
  const { setFieldValue } = useFormikContext();
  const [field] = useField({
    name: props.name,
  });

  const initialModelsOrUndefined = make === initialMake ? models : undefined;

  const { data: newModels } = useSWR<Model[]>("/api/models?make=" + make, {
    dedupingInterval: 60000,
    initialData: make === "all" ? [] : initialModelsOrUndefined,
  });

  useEffect(() => {
    if (!newModels?.map((a) => a.model).includes(field.value)) {
      setFieldValue("model", "all");
    }
  }, [make, newModels]);

  return (
    <FormControl fullWidth variant="outlined">
      <InputLabel id="search-model">Model</InputLabel>
      <Select
        name="model"
        labelId="search-model"
        label="Model"
        {...field}
        {...props}
      >
        <MenuItem value="all">
          <em>All Models</em>
        </MenuItem>
        {newModels?.map((model) => (
          <MenuItem key={model.model} value={model.model}>
            {`${model.model} (${model.count})`}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
