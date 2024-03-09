import { ButtonHTMLAttributes } from "react";

interface Iprops extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: string;
  className?: string;
}

const Button = ({children,className,...rest}:Iprops) => {
  return (
    <button
      className={`${className} text-white w-full py-2 rounded-md`} {...rest}
    >
      {children}
    </button>
  );
};

export default Button;