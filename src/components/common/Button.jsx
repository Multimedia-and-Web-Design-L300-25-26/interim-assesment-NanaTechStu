// src/components/common/Button.jsx
// Reusable Button component

/**
 * @param {'primary'|'secondary'|'dark'|'ghost'} variant
 * @param {'sm'|'md'|'lg'} size
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  onClick,
  type = 'button',
  disabled = false,
  className = '',
}) {
  const base =
    'inline-flex items-center justify-center font-semibold rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary:   'bg-cb-blue text-white hover:bg-cb-blue-dark focus:ring-cb-blue',
    secondary: 'bg-transparent text-cb-blue border border-cb-blue hover:bg-cb-blue-light focus:ring-cb-blue',
    dark:      'bg-cb-dark text-white hover:bg-cb-dark-2 focus:ring-gray-500',
    ghost:     'bg-transparent text-cb-dark hover:bg-cb-gray focus:ring-gray-300',
  };

  const sizes = {
    sm: 'text-sm px-4 py-2',
    md: 'text-sm px-6 py-3',
    lg: 'text-base px-8 py-4',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
    >
      {children}
    </button>
  );
}
