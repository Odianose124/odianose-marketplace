function RequestStatusBadge({ status }) {
  const styles = {
    open: "bg-green-100 text-green-700",
    accepted: "bg-blue-100 text-blue-700",
    closed: "bg-red-100 text-red-700",
    pending: "bg-yellow-100 text-yellow-700",
  };

  return (
    <span
      className={`px-4 py-2 rounded-full text-sm font-semibold capitalize ${
        styles[status] || "bg-gray-100 text-gray-700"
      }`}
    >
      {status}
    </span>
  );
}

export default RequestStatusBadge;