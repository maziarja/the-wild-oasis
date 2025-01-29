import { useSearchParams } from "react-router-dom";
import Select from "./Select";

function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleOnChange(e) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }
  const value = searchParams.get("sortBy") || "";

  return (
    <Select
      options={options}
      value={value}
      onChange={handleOnChange}
      type={"white"}
    />
  );
}

export default SortBy;
