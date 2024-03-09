import ProductCard from "./components/ProductCard";
import { productList } from "./data";

function App() {
  const renderProductList = productList.map((product) => <ProductCard product={product} key={product.id} />);

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
    </main>
  );
}

export default App
