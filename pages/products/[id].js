import React, {useEffect, useContext, useState} from 'react';
import {useRouter} from 'next/router';
import {FirebaseContext} from '../../firebase';
import Error404 from '../../components/layout/404';
import Layout from '../../components/layout/Layout';

const Product = () => {

    const [product, setProduct] = useState({});
    const [error, setError] = useState(false);

    const router = useRouter();
    const { query: {id}} = router;

    const {firebase} = useContext(FirebaseContext);

    useEffect( () => {
        if(id){
            const getProduct = async () => {
                const queryProduct = await firebase.db.collection('products').doc(id);
                const product = await queryProduct.get();
                if(product.exists){
                    setProduct(product.data());
                } else {
                    setError(true);
                }
            }
            getProduct();
        }
    }, [id]);


    return (
        <Layout>
            <>
            {error && <Error404/>}
            </>
        </Layout>
     );
}
 
export default Product;