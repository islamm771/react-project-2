import { HTMLAttributes } from "react";

interface Iprops extends HTMLAttributes<HTMLSpanElement> {
    bgColor:string
}

const CircleColor = ({bgColor,...rest}:Iprops) => {
  return <span 
  style={{backgroundColor:bgColor}} 
  className="block w-5 h-5 cursor-pointer rounded-full" 
  {...rest}>
    
  </span>;
};

export default CircleColor;