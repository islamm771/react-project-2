import { productList } from "../data";
import { IProduct } from "../interfaces";
import { TxtSlicer } from "../utilities/functions";
import ProductDetails from "./ProductDetails";
import ProductImg from "./ProductImg";
import Button from "./ui/Button";

interface Iprops {
  product:IProduct
  openModal: () => void
  setItem: (item:IProduct) => void
}

const ProductCard = ({product,openModal,setItem}:Iprops) =>{
  const {title,imageURL,description,price,category, colors} = product
  const renderColor = colors.map((color,index) => (
    <span style={{backgroundColor : color}} className="w-5 h-5 cursor-pointer rounded-full" key={index}>
    </span>
  ));
  const handleOpen = () =>{
    openModal();
    console.log(product.id);
    const Item = productList.filter((item) => item.id == product.id )[0]
    setItem(Item)
  }
  return (
    <div className="border rounded-lg p-3 flex flex-col">
      <ProductImg src={imageURL} alt="Product Image" className="rounded-lg" />

      <div className="card-describtion mt-2">
        <ProductDetails title={title} />
        <ProductDetails describtion={TxtSlicer(description, 80)} />
      </div>

      <div className="flex flex-wrap gap-2 my-4">
        {renderColor}
        {/* <span className="w-5 h-5 bg-red-500 cursor-pointer rounded-full" />
        <span className="w-5 h-5 bg-yellow-500 cursor-pointer rounded-full" /> */}
      </div>

      <div className="flex items-center justify-between">
        <span className="text-indigo-800">${price}</span>
        <div className="flex items-center gap-2">
          <ProductImg
            className="w-10 h-10 rounded-full"
            src={category.imageURL}
            alt={category.name}
          />
          <span>{category.name}</span>
        </div>
      </div>

      <div className="flex items-center justify-center space-x-2 mt-3">
        <Button className="bg-indigo-700" onClick={handleOpen}>Edit</Button>
        <Button className="bg-red-700">Delete</Button>
      </div>
    </div>
  );
};

export default ProductCard;