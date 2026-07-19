function AppCard({ children }) {
  return (
    <div
      className="
      w-full
      max-w-md
      bg-white
      rounded-[32px]
      shadow-2xl
      border
      border-gray-100
      p-8
      "
    >
      {children}
    </div>
  );
}

export default AppCard;