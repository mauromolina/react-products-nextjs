import React, {useEffect, useContext, useState} from 'react';
import {useRouter} from 'next/router';
import {FirebaseContext} from '../../firebase';
import Error404 from '../../components/layout/404';
import Layout from '../../components/layout/Layout';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { es } from 'date-fns/locale';
import { InputSubmit, InputContainer } from '../../components/ui/Form';
import { Button } from '../../components/ui/Button';

const ProductContent = styled.div`
    @media(min-width: 768px){
        display: grid;
        grid-template-columns: 2fr 1fr;
        column-gap: 2rem;
    }
`;

const Product = () => {

    const [product, setProduct] = useState({});
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const router = useRouter();
    const { query: {id}} = router;

    const {firebase, user} = useContext(FirebaseContext);

    useEffect( () => {
        if(id){
            const getProduct = async () => {
                const queryProduct = await firebase.db.collection('products').doc(id);
                const product = await queryProduct.get();
                if(product.exists){
                    console.log('existe');
                    setProduct(product.data());
                } else {
                    setError(true);
                }
            }
            getProduct();
        }
    }, [id, product]);

    const { comments, creationDate, desc, url, enterprise, name, urlImage, votes, creator, hasVoted} = product;

    const voteProduct = () => {
        if(!user){
            return router.push('/login');
        }

        if(hasVoted.includes(user.uid)) return;

        const newHasVoted = [...hasVoted, user.uid];

        const totalVotes = votes + 1;

        firebase.db.collection('products').doc(id).update( { votes: totalVotes, hasVoted: newHasVoted });

        setProduct({
            ...product,
            votes: totalVotes
        })
    }

    if(Object.keys(product).length === 0 && !error) return 'Cargando...';

    return (
        <Layout>
            <>
            {error ? 
                <Error404 msg="El producto no se pudo encontrar! Es probable que sea porque no existe..."/>
            :
                <div className="contenedor">
                    <h1
                        css={css`
                            text-align: center;
                            margin-top: 5rem;
                        `}
                        >
                            {name}
                    </h1>
                    <ProductContent>
                        <div>
                            <p>Publicado hace: {formatDistanceToNow(new Date(creationDate), {locale: es})}</p>
                            <p>Por: {creator.name} de {enterprise}</p>
                            <img src={urlImage}/>
                            <p>{desc}</p>
                            { user && (
                                <>
                                    <h2>Agrega un comentario</h2>
                                        <form>
                                            <InputContainer>
                                                <input
                                                    type="text"
                                                    name="msg"
                                                />    
                                            </InputContainer>
                                            <InputSubmit
                                                type="submit"
                                                value="Comentar"
                                            />
                                        </form>
                                </>
                            )}
                            <h2
                                css={css`
                                    margin: 2rem 0;
                                `}>Comentarios: {comments.length}</h2>
                            { comments.map( comment => (
                                <li>
                                    <p>{comment.name}</p>
                                    <p>Escrito por: {comment.userName}</p>
                                </li>
                            ))}
                        </div>
                        <aside>
                            <Button
                                target="_blank"
                                bgColor="true"
                                href={url}
                            >
                                Visitar URL
                            </Button>
                            <div
                                css={css`
                                    margin-top: 5rem;
                                `}>
                                <p
                                    css={css`
                                        text-align:center;
                                    `}>{votes} Votos</p>
                                { user && (
                                    <Button
                                        onClick={voteProduct}
                                    >
                                        Votar
                                    </Button>
                                )}
                            </div>
                        </aside>
                    </ProductContent>
                </div>
            }
            </>

        </Layout>
     );
}
 
export default Product;