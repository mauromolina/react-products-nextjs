import React, {useEffect, useState} from 'react';
import Layout from '../components/layout/Layout';
import { useRouter } from 'next/router';
import useProducts from '../hooks/useProducts';
import ProductDetails from '../components/layout/ProductDetails';

const Search = () => {

  const router = useRouter();
  const { query: {q}} = router;

  const { products } = useProducts('creationDate');
  const [result, setResult] = useState([]);

  useEffect( () => {
    const search = q.toLowerCase();
    const filtered = products.filter(product => {
      return(
        product.name.toLowerCase().includes(search) ||
        product.enterprise.toLowerCase().includes(search) ||
        product.creator.name.toLowerCase().includes(search)
      )
    });
    setResult(filtered);
  }, [q, products])

  return (
    <div>
      <Layout>
        <div className="listado-productos">
          <div className="contenedor">
            <ul className="bg-white">
              { result.map( product => (
                <ProductDetails
                  key={product.id}
                  product={product}
                />
              ))}
            </ul>
          </div>
        </div>
      </Layout>
    </div>
  )
}

export default Search;