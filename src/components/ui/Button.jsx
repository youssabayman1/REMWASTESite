import React from 'react';

const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'medium', 
  disabled = false, 
  type = 'button',
  className = '',
  ...props 
}) => {
  const baseClasses = 'font-medium rounded-xl transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 font-poppins';
  
  const variants = {
    primary: 'bg-[#254d70] text-white hover:bg-[#1e3d5a] focus:ring-[#254d70]',
    secondary: 'bg-[#254d7019] text-[#254d70] hover:bg-[#254d7033] focus:ring-[#254d70]',
    outline: 'border border-[#bcc1ca] bg-white text-[#254d70] hover:bg-gray-50 focus:ring-[#254d70]',
    'golden': 'bg-golden-background text-golden-foreground hover:bg-golden-dark focus:ring-golden-dark',
  };
  
  const sizes = {
    small: 'px-3 py-1 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg',
  };
  
  const buttonClasses = `${baseClasses} ${variants[variant]} ${sizes[size]} ${disabled ? 'cursor-not-allowed opacity-50' : ''} ${className}`;
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={buttonClasses}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;