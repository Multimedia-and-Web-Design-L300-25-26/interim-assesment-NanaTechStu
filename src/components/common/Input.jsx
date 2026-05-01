// src/components/common/Input.jsx
// Reusable Input field

export default function Input({
  label,
  id,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  required = false,
  className = '',
}) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-cb-dark">
          {label} {required && <span className="text-cb-red">*</span>}
        </label>
      )}
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className={`input-field ${error ? 'border-cb-red focus:ring-cb-red' : ''}`}
      />
      {error && <p className="text-xs text-cb-red mt-1">{error}</p>}
    </div>
  );
}
