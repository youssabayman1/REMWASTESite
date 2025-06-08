import React from 'react';

const Card = ({ 
  children, 
  className = '', 
  shadow = true, 
  rounded = true, 
  padding = true,
  ...props 
}) => {
  const baseClasses = 'bg-white';
  const shadowClass = shadow ? 'shadow-[0px_0px_2px_rgba(23,26,31,0.25)]' : '';
  const roundedClass = rounded ? 'rounded-[20px]' : '';
  const paddingClass = padding ? 'p-4' : '';
  
  const cardClasses = `${baseClasses} ${shadowClass} ${roundedClass} ${paddingClass} ${className}`;
  
  return (
    <div className={cardClasses} {...props}>
      {children}
    </div>
  );
};

export default Card;