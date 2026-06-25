const variants = {
  primary: "bg-blue-600 hover:bg-blue-700 text-white",

  success: "bg-green-600 hover:bg-green-700 text-white",

  danger: "bg-red-600 hover:bg-red-700 text-white",

  secondary: "bg-gray-100 hover:bg-gray-200 text-gray-800",
};

const Button = ({
  children,
  variant = "primary",
  className = "",
  ...props
}) => {
  return (
    <button
      className={`
        px-4
        py-2
        rounded-xl
        font-medium
        transition-all
        duration-300
        disabled:opacity-50
        disabled:cursor-not-allowed
        ${variants[variant]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
