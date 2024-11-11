// import React, { forwardRef } from "react";
// import { cn } from "@/lib/utils";

// const Input = forwardRef(({ 
//   className, 
//   type = "text",
//   error,
//   label,
//   helpText,
//   icon: Icon,
//   required,
//   ...props 
// }, ref) => {
//   return (
//     <div className="w-full space-y-2">
//       {label && (
//         <label className="flex text-sm font-medium text-gray-300">
//           {label}
//           {required && <span className="text-cyan-500 ml-1">*</span>}
//         </label>
//       )}
      
//       <div className="relative">
//         {Icon && (
//           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//             <Icon className="h-5 w-5 text-gray-400" />
//           </div>
//         )}
        
//         <input
//           type={type}
//           className={cn(
//             "flex h-10 w-full rounded-md border border-gray-700 bg-gray-800",
//             "px-3 py-2 text-sm text-gray-100 placeholder:text-gray-400",
//             "focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent",
//             "disabled:cursor-not-allowed disabled:opacity-50",
//             Icon && "pl-10",
//             error && "border-red-500 focus:ring-red-500",
//             className
//           )}
//           ref={ref}
//           {...props}
//         />
//       </div>

//       {error && (
//         <p className="text-sm text-red-500">{error}</p>
//       )}

//       {helpText && (
//         <p className="text-sm text-gray-400">{helpText}</p>
//       )}
//     </div>
//   );
// });

// Input.displayName = "Input";

// export { Input};
import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

const Input = forwardRef(({ 
  className, 
  type = "text",
  error,
  label,
  helpText,
  icon: Icon,
  required,
  onChange,
  value,
  onBlur,
  maxLength,
  minLength,
  pattern,
  ...props 
}, ref) => {
  // Remove local state management since this is a controlled component
  const handleInputChange = (e) => {
    console.log('Current email value:', e.target.value);
    // setEmail(e.target.value);
    if (onChange) {
      onChange(e);
    }
  };

  const handleClear = () => {
    if (onChange) {
      onChange({ target: { value: '' } });
    }
  };

  return (
    <div className="w-full space-y-2">
      {label && (
        <label className="flex text-sm font-medium text-gray-300">
          {label}
          {required && <span className="text-cyan-500 ml-1">*</span>}
          {maxLength && (
            <span className="ml-auto text-xs text-gray-400">
              {(value || '').length}/{maxLength}
            </span>
          )}
        </label>
      )}
      
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="h-5 w-5 text-gray-400" />
          </div>
        )}
        
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-gray-700 bg-gray-800",
            "px-3 py-2 text-sm text-gray-100 placeholder:text-gray-400",
            "focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "transition-colors duration-200",
            "hover:border-gray-600",
            Icon && "pl-10",
            error && "border-red-500 focus:ring-red-500",
            className
          )}
          ref={ref}
          value={value || ''}
          onChange={handleInputChange}
          onBlur={onBlur}
          maxLength={maxLength}
          minLength={minLength}
          pattern={pattern}
          {...props}
        />

        {/* Clear button for text inputs */}
        {type === "text" && value && !props.disabled && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>

      {error && (
        <p className="text-sm text-red-500 mt-1">{error}</p>
      )}

      {helpText && (
        <p className="text-sm text-gray-400 mt-1">{helpText}</p>
      )}

      {minLength && value && value.length < minLength && (
        <p className="text-sm text-yellow-500 mt-1">
          Minimum {minLength} characters required
        </p>
      )}
    </div>
  );
});

Input.displayName = "Input";

export { Input };