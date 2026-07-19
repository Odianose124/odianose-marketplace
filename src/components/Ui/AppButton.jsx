function AppButton({
  children,
  onClick,
  type = "button",
  variant = "primary",
  disabled = false,
}) {
  const styles = {
    primary:
      "bg-green-700 text-white hover:bg-green-800",

    secondary:
      "bg-white border border-green-700 text-green-700 hover:bg-green-50",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        w-full
        py-4
        rounded-2xl
        font-semibold
        text-lg
        transition
        duration-300
        ${styles[variant]}
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
      `}
    >
      {children}
    </button>
  );
}

export default AppButton;