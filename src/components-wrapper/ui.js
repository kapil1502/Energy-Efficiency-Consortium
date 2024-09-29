import React from 'react';

// Input component
export const Input = React.forwardRef(({ className, ...props }, ref) => (
  <input
    className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className || ''}`}
    ref={ref}
    {...props}
  />
));

// Button component
export const Button = React.forwardRef(({ className, children, ...props }, ref) => (
  <button
    className={`inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 ${className || ''}`}
    ref={ref}
    {...props}
  >
    {children}
  </button>
));

// Card components
export const Card = ({ className, ...props }) => (
  <div className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className || ''}`} {...props} />
);

export const CardHeader = ({ className, ...props }) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className || ''}`} {...props} />
);

export const CardTitle = ({ className, ...props }) => (
  <h3 className={`text-2xl font-semibold leading-none tracking-tight ${className || ''}`} {...props} />
);

export const CardDescription = ({ className, ...props }) => (
  <p className={`text-sm text-muted-foreground ${className || ''}`} {...props} />
);

export const CardContent = ({ className, ...props }) => (
  <div className={`p-6 pt-0 ${className || ''}`} {...props} />
);

export const CardFooter = ({ className, ...props }) => (
  <div className={`flex items-center p-6 pt-0 ${className || ''}`} {...props} />
);

// Label component
export const Label = React.forwardRef(({ className, ...props }, ref) => (
  <label
    ref={ref}
    className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className || ''}`}
    {...props}
  />
));

// Select components
export const Select = React.forwardRef(({ className, children, ...props }, ref) => (
  <select
    className={`flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className || ''}`}
    ref={ref}
    {...props}
  >
    {children}
  </select>
));

export const SelectTrigger = React.forwardRef(({ className, children, ...props }, ref) => (
  <button
    ref={ref}
    className={`flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className || ''}`}
    {...props}
  >
    {children}
  </button>
));

export const SelectValue = React.forwardRef(({ className, ...props }, ref) => (
  <span ref={ref} className={`block truncate ${className || ''}`} {...props} />
));

export const SelectContent = React.forwardRef(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={`relative z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md animate-in fade-in-80 ${className || ''}`}
    {...props}
  >
    {children}
  </div>
));

export const Alert = React.forwardRef(({ className, ...props }, ref) => (
    <div
      ref={ref}
      role="alert"
      className={`relative w-full rounded-lg border p-4 [&>svg]:absolute [&>svg]:text-foreground [&>svg]:left-4 [&>svg]:top-4 [&>svg+div]:translate-y-[-3px] [&:has(svg)]:pl-11 ${className}`}
      {...props}
    />
  ));
  
  export const AlertTitle = React.forwardRef(({ className, ...props }, ref) => (
    <h5
      ref={ref}
      className={`mb-1 font-medium leading-none tracking-tight ${className}`}
      {...props}
    />
  ));
  
  export const AlertDescription = React.forwardRef(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={`text-sm [&_p]:leading-relaxed ${className}`}
      {...props}
    />
  ));