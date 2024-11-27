import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [category, setCategory] = useState('');
  const[selectCategory, setselectCategory] = useState(['electronics', 'jewelery', "men's clothing", "women's clothing"])
  const [products, setproducts] = useState([]);
  const[productsCategory, setproductsCategory] = useState([]);
  const [errorMessage, seterrorMessage]= useState('')

  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products`)
      .then((res) => {
        if (!res.ok) { setproducts(res.data); }
        else { throw new Error(`${res.status}`) }
      })
      .catch(error => seterrorMessage(error.message));
  }, [])

  const enviar = () => {
    axios.get(`https://fakestoreapi.com/products/${category}`)
    .then ((res)=>{
      if(!res.ok){setproductsCategory(res.data)}
      else{throw new Error(`${res.status}`)}
    })
    .catch(error => seterrorMessage(error.message))
    console.log(productsCategory)
  }

  const handleCategoryChange = (event) => setCategory(event.target.value)

  const selectedCategory = (e) =>{

  }

  console.log(products)

  return (
    <main>

      <h1>Recuperatorio Requests con React</h1>

      <div>
        <h2>Lista de todos los productos disponibles:</h2>
        <ul>
        {products.map((product) =>{
          console.log(product.id);
          <li key={product.id}>{product.title}</li>/*, <p>{product.price}</p>*/
        })}
        </ul>
        <p className="result-box">

          
        </p>
      </div>

      <div>
        <h2>Obtener productos de una categoría determinada</h2>

        <h3>Ingrese una categoría:</h3>
        <select onChange={selectedCategory}>
          {selectCategory.map((cat)=>{
            <option value={cat}>{cat}</option>
          })}
        </select>
        <input type="text" value={category} onChange={handleCategoryChange} />
        <button onClick={enviar}>Enviar</button>

        <h3>Productos de la categoría ingresada:</h3>
        <ul className="result-box">
        {productsCategory.map((product) =>{
          <li key={product.id}>{product.title}</li>/*, <p>{product.price}</p>*/
        })}
        </ul>

      </div>

      <div>
        <h2>Mensaje en caso de error:</h2>
        <p className="result-box">{errorMessage}</p>
      </div>

      <div>
        <h2>Carritos con al menos 2 productos:</h2>
        <p className="result-box"></p>
      </div>

    </main>
  );
}

export default App;
