export function Input({ ...props }) {
  return (
    <input
      className="w-full border border-gray-300 rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      {...props}
    />
  );
}