const colors = {
  PENDING: "bg-yellow-100 text-yellow-700",

  APPROVED: "bg-blue-100 text-blue-700",

  DEPOSIT_PAID: "bg-purple-100 text-purple-700",

  ACTIVE: "bg-green-100 text-green-700",

  COMPLETED: "bg-gray-200 text-gray-700",

  REJECTED: "bg-red-100 text-red-700",
};

const StatusBadge = ({ status }) => {
  return (
    <span
      className={`
        px-3
        py-1
        rounded-full
        text-sm
        font-semibold
        ${colors[status]}
      `}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
