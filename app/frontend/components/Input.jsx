import React from 'react'
import classNames from 'classnames'

export default function Input({
  type = 'text',
  name,
  value,
  onChange,
  label,
  error,
  required = false,
  placeholder,
  className,
  disabled = false,
  ...props
}) {
  const baseInputClasses = "w-full rounded-md border-0 py-2 px-3 text-sm transition-colors duration-250"
  
  const inputClasses = classNames(
    baseInputClasses,
    {
      // Estado normal
      'bg-light-input-background text-light-text-primary border-light-input-border': !disabled && !error,
      'dark:bg-dark-input-background dark:text-dark-text-primary dark:border-dark-input-border': !disabled && !error,
      
      // Estado disabled
      'bg-light-input-background/50 text-light-text-muted cursor-not-allowed': disabled,
      'dark:bg-dark-input-background/50 dark:text-dark-text-muted': disabled,
      
      // Estado de erro
      'border-red-300 focus:ring-red-500 dark:border-red-700 dark:focus:ring-red-500': error,
      
      // Focus
      'focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400': !error && !disabled,
    },
    className
  )

  const labelClasses = classNames(
    "block text-sm font-medium mb-1",
    {
      'text-light-text-primary dark:text-dark-text-primary': !error,
      'text-red-500 dark:text-red-400': error,
      'text-light-text-muted dark:text-dark-text-muted': disabled
    }
  )

  const errorClasses = "mt-1 text-sm text-red-500 dark:text-red-400"
  const requiredClasses = "text-red-500 dark:text-red-400 ml-1"

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={name} className={labelClasses}>
          {label}
          {required && <span className={requiredClasses}>*</span>}
        </label>
      )}
      
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        className={inputClasses}
        {...props}
      />
      
      {error && <p className={errorClasses}>{error}</p>}
    </div>
  )
} 