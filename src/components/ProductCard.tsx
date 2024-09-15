import { IProduct } from "../interfaces";
import { TxtSlicer } from "../utilities/functions";
import CircleColor from "./CircleColor";
import ProductDetails from "./ProductDetails";
import ProductImg from "./ProductImg";
import Button from "./ui/Button";

interface Iprops {
  product: IProduct;
  setProductToEdit: (product: IProduct) => void;
  setEditOpen: () => void;
  index: number;
  setProductIndex: (val: number) => void;
  setProductColor: (cols: string[]) => void;
  openDelteModal : () => void
}

const ProductCard = ({product,setProductToEdit, setEditOpen,index , setProductIndex, openDelteModal,setProductColor}:Iprops) =>{
  const {title,imageURL,description,price,category, colors} = product
  const renderColor = colors.map((color) => (
    <CircleColor bgColor={color} key={color}/>
  ));
  const handleOpen = () =>{
    setProductToEdit(product)
    setProductColor(product.colors)
    setEditOpen();
    setProductIndex(index)
  }
  const onDelete = () =>{
    setProductToEdit(product)
    openDelteModal()
  }
  return (
    <div className="max-w-sm md:max-w-lg border rounded-lg p-3 flex flex-col">
      <ProductImg src={imageURL} alt="ProductImage" className="rounded-lg" />

      <div className="card-describtion mt-2">
        <ProductDetails title={title} />
        <ProductDetails describtion={TxtSlicer(description, 50)} />
      </div>

      <div className="flex flex-wrap gap-1 my-4">
        {renderColor.length > 0 ? <>{renderColor}</> : <span>No available colors!!</span>}
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
        <Button className="bg-red-700" onClick={onDelete}>Delete</Button>
      </div>
    </div>
  );
};

export default ProductCard;