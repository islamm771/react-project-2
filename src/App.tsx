import ProductCard from "./components/ProductCard";
import Button from "./components/ui/Button";
import Input from "./components/ui/Input";
import Modal from "./components/ui/Modal";
import { formInputsList, productList } from "./data";
import { ChangeEvent, useState } from "react";
import { IProduct } from "./interfaces";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [item,setItem] = useState<IProduct>(
    {id:'' , 
    title:'' , 
    colors:[] , 
    category:{name:'' , imageURL:''} ,
    description:'' ,
    price:'', 
    imageURL:''}
  )
  
  const submitChange = () =>{
    
  }

  const handleChange = (e:ChangeEvent<HTMLInputElement>) =>{
    const {value , name} = e.target
    setItem({
      ...item,
      [name]:value
    })
  }
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  const renderProductList = productList.map((product) => (
    <ProductCard
      product={product}
      key={product.id}
      openModal={openModal}
      setItem={setItem}
    />
  ));

  const renderForm = formInputsList.map( (form) =>
    <div className="mb-4" key={form.id}>
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={form.id}>
          {form.label}
        </label>
        <Input id={form.id} type={form.type} name={form.name} value={item[form.name]} onChange={(e) => {handleChange(e)}} />
    </div>

    );
  return (
    <main className="container">
      <div
        className="m-5 p-3 grid gap-4
      grid-cols-1
      md:grid-cols-2
      lg:grid-cols-3
      xl:grid-cols-4"
      >
        {renderProductList}
      </div>
      <Modal isOpen={isOpen} closeModal={closeModal} title={'ADD NEW PRODUCT'}>
        <form className="bg-white rounded px-4 pt-6 pb-8" onSubmit={(e) =>{e.preventDefault()}}>
          {renderForm}
          <div className="flex items-center justify-between mt-6">
            <Button className="bg-indigo-700 hover:bg-indigo-800 p-2" onClick={submitChange}>Submit</Button>
          </div>
        </form>
      </Modal>
    </main>
  );
}

export default App
