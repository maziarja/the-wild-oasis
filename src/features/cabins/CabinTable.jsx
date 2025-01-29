import CabinRow from "./CabinRow";
import Spinner from "../../ui/Spinner";
import { useGetCabins } from "./useGetCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";

// const TableHeader = styled.header`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;

//   background-color: var(--color-grey-50);
//   border-bottom: 1px solid var(--color-grey-100);
//   text-transform: uppercase;
//   letter-spacing: 0.4px;
//   font-weight: 600;
//   color: var(--color-grey-600);
//   padding: 1.6rem 2.4rem;
// `;

function CabinTable() {
  const { cabins, isLoading } = useGetCabins();
  const [searchParams] = useSearchParams();

  // 1) FILTER

  const filterValue = searchParams.get("discount") || "all";
  let cabinFiltered;
  if (filterValue === "all") cabinFiltered = cabins;
  if (filterValue === "with-discount")
    cabinFiltered = cabins?.filter((cabin) => cabin.discount > 0);
  if (filterValue === "no-discount")
    cabinFiltered = cabins?.filter((cabin) => cabin.discount === 0);

  // 2) SORT
  const sortBy = searchParams.get("sortBy") || "name-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;

  const sortedCabins = cabinFiltered?.sort((a, b) =>
    typeof a[field] === "number"
      ? (a[field] - b[field]) * modifier
      : a[field].localeCompare(b[field]) * modifier
  );
  if (isLoading) return <Spinner />;
  if (!sortedCabins.length) return <Empty resource={"cabins"} />;
  return (
    <Menus>
      <Table columns={"0.6fr 1.8fr 2.2fr 1fr 1fr 1fr"}>
        <Table.Header role="row">
          <div>cabin</div>
          <div>capacity</div>
          <div>price</div>
          <div>disccount</div>
        </Table.Header>
        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
