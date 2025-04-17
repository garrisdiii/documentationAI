export function Textarea({ ...props }) {
  return (
    <textarea
      rows={3}
      className="w-full border border-gray-300 rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      {...props}
    />
  );
}