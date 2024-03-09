interface Iprops {
    src:string
    alt:string
    className?:string
}

const ProductImg = ({src,alt,className}:Iprops) => {
  return <>
  <img src={src} alt={alt} className={className} />
  </>;
};

export default ProductImg;