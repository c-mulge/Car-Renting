const StatCard = ({ title, value, color = "blue" }) => {
  const colors = {
    blue: "bg-blue-50 text-blue-700",
    green: "bg-green-50 text-green-700",
    yellow: "bg-yellow-50 text-yellow-700",
    red: "bg-red-50 text-red-700",
    purple: "bg-purple-50 text-purple-700",
  };

  return (
    <div
      className={`
        rounded-2xl
        border
        p-6
        shadow-sm
        hover:shadow-md
        transition-all
        ${colors[color]}
      `}
    >
      <p className="text-sm font-medium">{title}</p>

      <h2 className="text-4xl font-bold mt-2">{value}</h2>
    </div>
  );
};

export default StatCard;
