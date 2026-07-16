function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  className = "",
}) {
  const variants = {
    primary:
      "bg-green-700 hover:bg-green-800 text-white",

    secondary:
      "border border-green-700 text-green-700 hover:bg-green-50",

    ghost:
      "text-green-700 hover:bg-green-50",

    danger:
      "bg-red-600 hover:bg-red-700 text-white",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`
        px-6
        py-3
        rounded-xl
        font-semibold
        transition-all
        duration-300
        ${variants[variant]}
        ${className}
      `}
    >
      {children}
    </button>
  );
}

export default Button;