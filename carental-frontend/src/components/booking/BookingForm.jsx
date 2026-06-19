import { useState } from "react";

const BookingForm = ({ vehicleId, onSubmit }) => {
  const [pickupDate, setPickupDate] = useState("");

  const [returnDate, setReturnDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      vehicleId,
      pickupDate,
      returnDate,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-8">
      <div>
        <label>Pickup Date</label>

        <input
          type="date"
          value={pickupDate}
          onChange={(e) => setPickupDate(e.target.value)}
          className="
            w-full
            border
            rounded-lg
            p-3
          "
        />
      </div>

      <div>
        <label>Return Date</label>

        <input
          type="date"
          value={returnDate}
          onChange={(e) => setReturnDate(e.target.value)}
          className="
            w-full
            border
            rounded-lg
            p-3
          "
        />
      </div>

      <button
        className="
          w-full
          bg-black
          text-white
          py-3
          rounded-lg
        "
      >
        Request Booking
      </button>
    </form>
  );
};

export default BookingForm;
