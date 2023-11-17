import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  InputLabel,
} from "@mui/material";

interface DropdownProps {
  value: string;
  onChange: (event: SelectChangeEvent) => void;
  items: { value: string; label: string }[];
  label: string;
  labelId: string;
}

export const Dropdown = ({
  value,
  onChange,
  items,
  label,
  labelId,
}: DropdownProps) => {
  return (
    <FormControl size="small" fullWidth>
      <InputLabel id={`id-${labelId}`} style={{ fontSize: "0.9rem" }}>
        {label}
      </InputLabel>
      <Select
        labelId={`label-id-${labelId}`}
        id={`id-${labelId}`}
        value={value}
        label={label}
        onChange={onChange}
      >
        {items.map(({ value, label }) => {
          return <MenuItem value={value}>{label}</MenuItem>;
        })}
      </Select>
    </FormControl>
  );
};
