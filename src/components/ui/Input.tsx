import { InputHTMLAttributes } from "react";

interface Iprops extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const Input = ({className,...rest}:Iprops) => {
  return (
    <input
      className={`${className} shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight
      focus:outline-none focus:shadow-outline focus:border-indigo-600 focus:ring-indigo-600 focus:ring-1`}
      {...rest}
    />
  );
};

export default Input;