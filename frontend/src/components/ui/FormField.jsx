import clsx from "clsx";

function FormField({
  id,
  label,
  required = false,
  error,
  children,
  className,
}) {
  const errorId = error ? `${id}-error` : undefined;

  return (
    <div className={clsx("space-y-2", className)}>
      <label
        htmlFor={id}
        className="block text-sm font-semibold text-[#0F172A]"
      >
        {label}
        {required && (
          <span className="text-[#F97316] ml-1" aria-hidden="true">
            *
          </span>
        )}
        {required && <span className="sr-only"> (required)</span>}
      </label>
      {children({ id, errorId, hasError: Boolean(error) })}
      {error && (
        <p id={errorId} className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export default FormField;
