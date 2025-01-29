import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useGetBooking } from "./useGetBooking";
import { useNavigate } from "react-router-dom";
import { useCheckOutBooking } from "./useCheckout";
import { HiTrash } from "react-icons/hi2";
import { useDeleteBooking } from "./useDeleteBooking";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Empty from "../../ui/Empty";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { booking, isLoading } = useGetBooking();
  const navigate = useNavigate();
  const moveBack = useMoveBack();

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };
  const { checkOutBooking, isCheckingOut } = useCheckOutBooking();
  const { id: bookingId, status } = booking;
  const { isDeleting, deleteBooking } = useDeleteBooking();
  if (isLoading) return <Spinner />;
  if (!booking.id) return <Empty resourceName="booking" />;
  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />
      <Modal>
        <ButtonGroup>
          {booking?.status === "unconfirmed" && (
            <Button onClick={() => navigate(`/checkin/${bookingId}`)}>
              Check in
            </Button>
          )}
          {booking?.status === "checked-in" && (
            <Button
              disabled={isCheckingOut}
              onClick={() =>
                checkOutBooking({
                  bookingId,
                  obj: {
                    status: "checked-out",
                  },
                })
              }
            >
              check out
            </Button>
          )}
          <Button variation="secondary" onClick={moveBack}>
            Back
          </Button>
          <Modal.Open opens="delete">
            <Button variation={"danger"} icon={<HiTrash />}>
              Delete
            </Button>
          </Modal.Open>
        </ButtonGroup>
        <Modal.Window name="delete">
          <ConfirmDelete
            resourceName={"Booking"}
            onConfirm={() =>
              deleteBooking(bookingId, {
                onSettled: navigate(-1),
              })
            }
            disabled={isDeleting}
          />
        </Modal.Window>
      </Modal>
    </>
  );
}

export default BookingDetail;
