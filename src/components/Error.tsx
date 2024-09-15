interface Iprops {
    msg:string
}

const ErrorMsg = ({msg}:Iprops) => {
  return msg ? <span className="text-[12px] text-red-600">{msg}</span> : null;
};

export default ErrorMsg;