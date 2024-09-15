import { v4 as uuid } from "uuid";
import ProductCard from "./components/ProductCard";
import ErrorMsg from "./components/Error";
import Button from "./components/ui/Button";
import Input from "./components/ui/Input";
import Modal from "./components/ui/Modal";
import { categories, colors, formInputsList, productList } from "./data";
import { ChangeEvent, useState } from "react";
import { IProduct } from "./interfaces";
import CircleColor from "./components/CircleColor";
import Select from "./components/ui/Select";
import toast, { Toaster } from "react-hot-toast";
import { productsValidation } from "./vaildations";

function App() {
  const defaultProductObj = {
    id: "",
    title: "",
    colors: [],
    category: { name: "", imageURL: "" },
    description: "",
    price: "",
    imageURL: "",
  };
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [products, setProducts] = useState<IProduct[]>(productList);
  const [product, setProduct] = useState<IProduct>(defaultProductObj);
  const [productToEdit, setProductToEdit] = useState<IProduct>(defaultProductObj);
  const [ProductEditIdx, setProductIndex] = useState<number>(0);
  const [productColor, setProductColor] = useState<string[]>([]);
  const [selected, setSelected] = useState(categories[1]);
  const [errors, setErrors] = useState({ title: "", description: "", imageURL: "", price: "" })

  const handleCancel = () => {
    setProduct(defaultProductObj);
    setProductColor([]);
    closeModal();
    closeEditModal();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    })
  };
  const handleEditChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setProductToEdit({
      ...productToEdit,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    })
  };

  const handleColor = (color: string) => {
    // if (!productColor.includes(color)) {
    //   setProductColor([...productColor, color]);
    // } else {
    //   const prodColors = productColor.filter((p) => p !== color);
    //   setProductColor(prodColors);
    // }
    if (!productColor.includes(color)) {
      setProductColor((prev) => [...prev, color]);
    } else {
      setProductColor((prev) => prev.filter((item) => item !== color));
    }
  };

  const handleEditColor = (color: string) => {
    if (!productColor.includes(color)) {
      setProductColor((prev) => [...prev, color]);
    } else {
      setProductColor((prev) => prev.filter((item) => item !== color));
    }
  };

  const handleDelete = () => {
    const updated = products.filter(product => product.id !== productToEdit.id)
    setProducts(updated)
    closeDeleteModal();
    toast.success("The Product has been deleted", {
      position: "top-right",
      icon: "👏",
    });
  }

  function closeModal() {
    setIsOpen(false);
  }
  function openModal() {
    setIsOpen(true);
  }

  function closeEditModal() {
    setIsEditOpen(false);
  }

  function openEditModal() {
    setIsEditOpen(true);

  }

  function closeDeleteModal() {
    setIsDeleteOpen(false);
  }

  function openDelteModal() {
    setIsDeleteOpen(true);
  }

  const renderProductList = products.map((product, index) => (
    <ProductCard
      product={product}
      key={product.id}
      setProductToEdit={setProductToEdit}
      setEditOpen={openEditModal}
      index={index}
      setProductIndex={setProductIndex}
      openDelteModal={openDelteModal}
      setProductColor={setProductColor}
    />
  ));

  const submitChange = () => {

    const { title, imageURL, description, price } = product

    const error = productsValidation({
      title, description, imageURL, price
    })

    const hasErrorMsg =
      Object.values(error).some(
        (value) => value === ""
      ) &&
      Object.values(error).every((value) => value === "");

    if (!hasErrorMsg) {
      setErrors(error)
      return;
    }

    setProducts((prev) => [
      ...prev,
      { ...product, id: uuid(), colors: productColor, category: selected },
    ]);
    setProduct(defaultProductObj);
    setProductColor([]);
    closeModal();
    toast.success("The Product has been added", {
      position: "top-right",
    });

  };

  const submitEditChange = () => {
    const { title, imageURL, description, price } = productToEdit

    const error = productsValidation({
      title, description, imageURL, price
    })

    const hasErrorMsg =
      Object.values(error).some(
        (value) => value === ""
      ) &&
      Object.values(error).every((value) => value === "");

    if (!hasErrorMsg) {
      setErrors(error)
      return;
    }

    const updatedProducts = [...products];
    updatedProducts[ProductEditIdx] = {
      ...productToEdit,
      colors: productColor,
    };
    setProducts(updatedProducts);
    setProductToEdit(defaultProductObj);
    setProductColor([]);
    closeEditModal();
    toast.success("The Product has been modified", {
      position: "top-right",
    });
  };

  const renderProductColors = (colors: string[], clickHandler: (color: string) => void) => (
    colors.map((color) => (
      <CircleColor
        bgColor={color}
        key={color}
        onClick={() => clickHandler(color)}
      />
    ))
  );

  const renderProductForm = (
    product: IProduct,
    onchangeHandle: (e: ChangeEvent<HTMLInputElement>) => void
  ) =>
    formInputsList.map((form) => (
      <div className="mb-4" key={form.id}>
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor={form.id}
        >
          {form.label}
        </label>
        <Input
          id={form.id}
          type={form.type}
          name={form.name}
          value={product[form.name]}
          onChange={(e) => {
            onchangeHandle(e);
          }}
        />
        <ErrorMsg msg={errors[form.name]} />
      </div>
    ));

  return (
    <main className="container pt-5 pb-5">
      <div className="title flex justify-between items-center">
        <h2 className="text-3xl font-bold">
          Latest <span className="text-indigo-600">Products</span>
        </h2>
        <Button
          className="bg-indigo-700 hover:bg-indigo-800 p-2"
          width="w-fit"
          onClick={openModal}
        >
          Build
        </Button>
      </div>
      <div
        className="mt-[3rem] grid gap-2
      grid-cols-1
      md:grid-cols-2
      lg:grid-cols-3
      xl:grid-cols-4"
      >
        {renderProductList}
      </div>

      {/* ADD PRODUCT MODAL */}
      <Modal isOpen={isOpen} closeModal={closeModal} title={"ADD NEW PRODUCT"}>
        <form
          className="bg-white rounded px-4 pt-6 pb-8"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          {renderProductForm(product, handleChange)}

          <div className="mb-4">
            <Select
              selected={selected}
              setSelected={setSelected}
            />
          </div>

          {productColor.length > 0 && (
            <div className="flex items-center flex-wrap gap-2 mb-3">
              {productColor.map((color) => (
                <span
                  className="text-xs rounded-md p-1 text-white"
                  style={{ backgroundColor: color }}
                  key={color}
                >
                  {color}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-center space-x-1">
            {renderProductColors(colors, handleColor)}
          </div>

          <div className="flex items-center justify-between mt-6 space-x-4">
            <Button
              className="bg-indigo-700 hover:bg-indigo-800 p-2"
              onClick={submitChange}
            >
              Submit
            </Button>
            <Button
              className="bg-gray-400 hover:bg-gray-500 p-2"
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>

      {/* Edit PRODUCT MODAL */}
      <Modal isOpen={isEditOpen} closeModal={closeEditModal} title={"Edit Product"}>
        <form
          className="bg-white rounded px-4 pt-6 pb-8"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          {renderProductForm(productToEdit, handleEditChange)}

          <div className="mb-4">
            <Select
              selected={productToEdit.category}
              setSelected={(value) =>
                setProductToEdit({ ...productToEdit, category: value })
              }
            />
          </div>

          {productColor.length > 0 && (
            <div className="flex items-center flex-wrap gap-2 mb-3">
              {productColor.map((color) => (
                <span
                  className="text-xs rounded-md p-1 text-white"
                  style={{ backgroundColor: color }}
                  key={color}
                >
                  {color}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-center space-x-1">
            {renderProductColors(colors, handleEditColor)}
          </div>

          <div className="flex items-center justify-between mt-6 space-x-4">
            <Button
              className="bg-indigo-700 hover:bg-indigo-800 p-2"
              onClick={submitEditChange}
            >
              Submit
            </Button>
            <Button
              className="bg-gray-200 hover:bg-gray-400 p-2"
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>

      {/* {Delete PRODUCT MODAL} */}
      <Modal isOpen={isDeleteOpen} closeModal={closeDeleteModal} title={"Delete Product"}>
        <p>Are you sure to delete this product ?</p>
        <div className="flex items-center justify-between mt-6 space-x-4">
          <Button
            className="bg-red-500 hover:bg-red-600 p-2"
            onClick={handleDelete}
          >
            Yes
          </Button>
          <Button
            className="bg-gray-200 hover:bg-gray-400 p-2"
            onClick={closeDeleteModal}
          >
            No
          </Button>
        </div>
      </Modal>
      <Toaster />
    </main>
  );
}

export default App;
