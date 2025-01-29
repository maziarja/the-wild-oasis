import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useGetBooking } from "../bookings/useGetBooking";
import Spinner from "../../ui/Spinner";
import Checkbox from "../../ui/Checkbox";
import { useEffect, useState } from "react";
import { useCheckinBooking } from "../bookings/useCheckinBooking";
import { formatCurrency } from "../../utils/helpers";
import { useSettings } from "../settings/useSettings";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const { booking, isLoading } = useGetBooking();
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [confirmBreakfast, setConfirmBreakfast] = useState(false);
  const moveBack = useMoveBack();
  const { checkInBooking } = useCheckinBooking();
  const { settings } = useSettings();
  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
    isPaid,
    extrasPrice,
    cabinPrice,
  } = booking;
  const breakFastPrice = Number(
    settings?.breakfastPrice * numNights * numGuests
  );

  useEffect(
    function () {
      setConfirmPaid(isPaid);
    },
    [isPaid]
  );

  function handleCheckin() {
    if (!confirmPaid) return;
    checkInBooking({
      bookingId,
      obj: {
        status: "checked-in",
        isPaid: true,
        ...(confirmBreakfast && {
          hasBreakfast: true,
          extrasPrice: breakFastPrice,
          totalPrice: breakFastPrice + cabinPrice,
        }),
      },
    });
  }

  if (isLoading) return <Spinner />;
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />
      {!hasBreakfast && (
        <Box>
          <Checkbox
            id={guests.fullName}
            checked={confirmBreakfast}
            onChange={() => {
              setConfirmBreakfast((confirm) => !confirm);
              setConfirmPaid(false);
            }}
          >
            Adding breakfast for {formatCurrency(breakFastPrice)}
          </Checkbox>
        </Box>
      )}
      <Box>
        <Checkbox
          id={bookingId}
          checked={confirmPaid}
          onChange={() => setConfirmPaid((confirm) => !confirm)}
          disabled={confirmPaid}
        >
          I confirm that {guests.fullName} has paid the total amount of{" "}
          {confirmBreakfast
            ? formatCurrency(totalPrice + breakFastPrice)
            : formatCurrency(totalPrice)}
        </Checkbox>
      </Box>
      <ButtonGroup>
        <Button disabled={!confirmPaid} onClick={handleCheckin}>
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
