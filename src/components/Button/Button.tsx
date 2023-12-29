import { ButtonHTMLAttributes, ReactNode } from "react"
import { twMerge } from "tailwind-merge";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
}

export default function Button({ children, className, ...props } : ButtonProps) {
    return (
    <button 
        className={twMerge(
            "text-white text-2xl font-medium rounded-lg py-2.5 px-5 border-2 border-transparent hover:border-white cursor-pointer bg-neutral-900 transition-all duration-200",
            className
        )}
        {...props}     
    >
        {children}
    </button>
    );
}
