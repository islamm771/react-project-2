interface Iprops {
    title ?:string
    describtion ?:string
}

const ProductDetails = ({title,describtion}:Iprops) => {
  return (
    <>
      {title ? <h3>{title}</h3> : <></>}
      {describtion ? <p>{describtion}</p> : <></>}
    </>
  );
};

export default ProductDetails;