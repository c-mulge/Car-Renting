const Card = ({ children, className = "" }) => {
  return (
    <div
      className={`
        bg-white
        rounded-xl
        shadow-sm
        hover:shadow-md
        border
        transition-all
        duration-300
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Card;
