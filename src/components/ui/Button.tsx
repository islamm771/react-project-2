import { ButtonHTMLAttributes } from "react";

interface Iprops extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: string;
  className?: string;
  width?:'w-full' | 'w-fit'
}

const Button = ({children,className,width='w-full',...rest}:Iprops) => {
  return (
    <button
      className={`${className} ${width}  text-white py-2 rounded-md`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;