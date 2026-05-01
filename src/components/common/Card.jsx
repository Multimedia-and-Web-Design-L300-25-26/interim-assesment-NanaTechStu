// src/components/common/Card.jsx
// Reusable Card wrapper

export default function Card({ children, className = '', onClick }) {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-2xl border border-cb-gray-2 p-6 hover:shadow-md transition-shadow duration-200 ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {children}
    </div>
  );
}
