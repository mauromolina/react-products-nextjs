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
import Loading from '../../components/ui/Loading';

const ProductContent = styled.div`
    @media(min-width: 768px){
        display: grid;
        grid-template-columns: 2fr 1fr;
        column-gap: 2rem;
    }
`;

const ProductCreator = styled.p`
    padding: .5rem 2rem;
    background-color: #DA552F;
    color: #ffffff;
    text-transform: uppercase;
    font-weight: bold;
    display: inline-block;
    text-align: center;
`;

const Product = () => {

    const [product, setProduct] = useState({});
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [comment, setComment] = useState({});
    const [queryDB, setQueryDB] = useState(true);

    const router = useRouter();
    const { query: {id}} = router;

    const {firebase, user} = useContext(FirebaseContext);

    useEffect( () => {
        if(id && queryDB){
            const getProduct = async () => {
                const queryProduct = await firebase.db.collection('products').doc(id);
                const product = await queryProduct.get();
                setTimeout(() => {
                    if(product.exists){
                        setProduct(product.data());
                        setQueryDB(false);
                    } else {
                        setError(true);
                        setQueryDB(false);
                    }
                }, 2000);
                
            }
            getProduct();
        }
    }, [id]);

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
        setQueryDB(true);
    }

    const handleComment = e => {
        setComment({
            ...comment,
            [e.target.name] : e.target.value
        })
    }

    const isCreator = id => {
        if(creator.id === id) {
            return true;
        }
    }

    const addComment = e => {
        e.preventDefault();
        if(!user) return router.push('/login');
        comment.userId = user.uid;
        comment.userName = user.displayName;
        const newComments = [...comments, comment];
        firebase.db.collection('products').doc(id).update( { comments: newComments });
        setProduct({
            ...product,
            comments: newComments
        })
        setQueryDB(true);

    }

    const canDelete = () => {
        if(!user) return false;
        if(creator.id === user.uid){
            return true;
        }
    }

    const deleteProduct = async() => {
        if(!user){
            return router.push('/login');
        }
        if(creator.id !== user.uid){
            return router.push('/')
        }
        try {
            await firebase.db.collection('products').doc(id).delete();
            router.push('/');
        } catch (error) {
            console.log(error);
        }
    }

    if(Object.keys(product).length === 0 && !error) return <Loading msg="Cargando producto..."/>;

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
                                        <form
                                            onSubmit={addComment}
                                        >
                                            <InputContainer>
                                                <input
                                                    type="text"
                                                    name="msg"
                                                    onChange={handleComment}
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
                                { comments.length === 0 ? 'No hay comentarios' : (
                                    <ul>
                                    { comments.map( (comment, i) => (
                                        <li
                                            key={`${comment.userId}-${i}`}
                                            css={ css`
                                                border: 1px solid #e1e1e1;
                                                padding: 2rem;
                                                border-bottom: 3px solid #bbb;
                                            `}>
                                            <p>{comment.msg}</p>
                                            <p>Escrito por:
                                                <span css={css` font-weight: bold`}>
                                                    {' '}{comment.userName}
                                                </span>
                                            </p>
                                            { isCreator(comment.userId) && <ProductCreator>Creador</ProductCreator>}
                                        </li>
                                    ))}
                                    </ul>
                                )}
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
                    { canDelete() && <Button onClick={deleteProduct}>Eliminar Producto</Button>}
                </div>
            }
            </>

        </Layout>
     );
}
 
export default Product;