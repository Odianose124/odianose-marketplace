function Section({
  children,
  className = "",
  background = "white",
}) {
  const backgrounds = {
    white: "bg-white",
    gray: "bg-gray-100",
    green: "bg-green-50",
  };

  return (
    <section
      className={`
        py-16
        ${backgrounds[background]}
        ${className}
      `}
    >
      {children}
    </section>
  );
}

export default Section;