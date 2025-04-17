export function Card({ children }) {
  return <div className="shadow-lg rounded-2xl border">{children}</div>;
}

export function CardContent({ children, className = "" }) {
  return <div className={`p-4 ${className}`}>{children}</div>;
}