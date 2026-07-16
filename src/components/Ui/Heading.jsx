function Heading({
  children,
  level = "h2",
  align = "center",
  className = "",
}) {
  const Tag = level;

  const alignments = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  return (
    <Tag
      className={`
        text-4xl
        font-bold
        mb-10
        ${alignments[align]}
        ${className}
      `}
    >
      {children}
    </Tag>
  );
}

export default Heading;