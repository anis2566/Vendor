import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DEFAULT_SORT_OPTIONS } from "@/constant";

export const Sort = () => {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Sort" />
      </SelectTrigger>
      <SelectContent>
        {DEFAULT_SORT_OPTIONS.map((v, i) => (
          <SelectItem value={v.value} key={i}>
            {v.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
