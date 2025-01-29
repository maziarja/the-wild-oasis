import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";
import Spinner from "../../ui/Spinner";

function Stats({ bookings, confirmedStays, numDays, cabinCount }) {
  const numBookings = bookings.length;
  const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);
  const checkins = confirmedStays.length;

  //    occupancyRate = checkins / numDays * cabins
  const occupation = confirmedStays.reduce(
    (acc, cur) => acc + cur.numNights,
    0
  );
  const occupancyRate = Math.round((occupation / (numDays * cabinCount)) * 100);

  return (
    <>
      <Stat
        color={"blue"}
        icon={<HiOutlineBriefcase />}
        title={"Bookings"}
        value={numBookings}
      />
      <Stat
        color={"green"}
        icon={<HiOutlineBanknotes />}
        title={"Sales"}
        value={formatCurrency(sales)}
      />
      <Stat
        color={"indigo"}
        icon={<HiOutlineCalendarDays />}
        title={"Check ins"}
        value={checkins}
      />
      <Stat
        color={"yellow"}
        icon={<HiOutlineChartBar />}
        title={"Occupancy rate"}
        value={occupancyRate + "%"}
      />
    </>
  );
}

export default Stats;
