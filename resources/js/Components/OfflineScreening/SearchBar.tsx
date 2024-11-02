import { Search } from "lucide-react";
import { Input } from "@/Components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectLabel, SelectItem, SelectGroup, SelectValue } from "@/Components/ui/select";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  handleChangePerpage: (value: string) => void;
}

const SearchBar = ({ searchQuery, setSearchQuery, handleChangePerpage }: SearchBarProps) => (
  <div className="flex items-center space-x-4">
    <div className="relative flex-1">

      <Input
        type="text"
        placeholder="Filter Name"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="max-w-sm"
      />
    </div>
    <Select name="perpage" onValueChange={handleChangePerpage}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select items per page" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Items per page</SelectLabel>
          <SelectItem value="10">10</SelectItem>
          <SelectItem value="50">50</SelectItem>
          <SelectItem value="100">100</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  </div>
);

export default SearchBar;
