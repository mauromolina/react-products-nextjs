import React, {useState, useContext} from 'react';
import { css } from '@emotion/core';
import Router, {useRouter} from 'next/router';
import FileUploader from 'react-firebase-file-uploader';
import Layout from '../components/layout/Layout';
import { Form, InputContainer, InputSubmit, Error } from '../components/ui/Form';
import useValidation from '../hooks/useValidation';
import validateNewProduct from '../validation/validateNewProduct';
import {FirebaseContext} from '../firebase';
import Error404 from '../components/layout/404';


const NewProduct = () => {

  const [imageName, setImageName] = useState('');
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [urlImage, setUrlImage] = useState('');

  const initialState = {
    name: '',
    enterprise: '',
    img: '',
    url: '',
    desc: ''
  }
  const [ error, setError ] = useState(false);
  const {values, errors, submitForm, handleSubmit, handleChange, handleBlur} = useValidation(initialState, validateNewProduct, newProduct);

  const { name, enterprise, img, url, desc } = values;

  // hook para redireccionar
  const router = useRouter();

  const {user, firebase} = useContext(FirebaseContext);

  function newProduct() {

    if(!user){
      return router.push('/login');
    }

    const product = {
      name,
      enterprise,
      url,
      urlImage,
      desc,
      votes: 0,
      comments: [],
      creationDate: Date.now(),
      creator: {
        id: user.uid,
        name: user.displayName
      },
      hasVoted: [] 
    }

    firebase.db.collection('products').add(product);
    return router.push('/');
  }


  const handleUploadStart = () => {
    setProgress(0);
    setUploading(true);
  }

  const handleUploadError = error => {
    setUploading(error);
    console.log(error);
  }

  const handleUploadSuccess = name => {
    setProgress(100);
    setUploading(false);
    setImageName(name);
    firebase
      .storage
      .ref("products")
      .child(name)
      .getDownloadURL()
      .then(url => setUrlImage(url))
  }

  const handleProgress = progress => setProgress({progress})


  return (
    <div>
      <Layout>
        { !user ? 
          <Error404
            msg="Es necesario que inicies sesión para poder acceder a esta página!"/>
        : 
        <>
          <h1
            css={css`
              text-align: center;
              margin-top: 5rem;
            `}>
              Nuevo producto
            </h1>
          <Form
            onSubmit={handleSubmit}
            noValidate
          >
            <fieldset>
              <legend>
                Información general
              </legend>
            
            <InputContainer>
              <label
                htmlFor="name">
                  Nombre
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Nombre"
                  name="name"
                  value={name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
            </InputContainer>
            { errors.name && <Error>{errors.name}</Error>}

            <InputContainer>
              <label
                htmlFor="enterprise">
                  Empresa
                </label>
                <input
                  type="text"
                  id="enterprise"
                  placeholder="Empresa"
                  name="enterprise"
                  value={enterprise}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
            </InputContainer>
            { errors.enterprise && <Error>{errors.enterprise}</Error>}
            <InputContainer>
              <label
                htmlFor="img">
                  Imagen
                </label>
                <FileUploader
                  accept="image/*"
                  id="img"
                  name="img"
                  randomizeFileName
                  storageRef={firebase.storage.ref("products")}
                  onUploadStart={handleUploadStart}
                  onUploadError={handleUploadError}
                  onUploadSuccess={handleUploadSuccess}
                  onProgress={handleProgress}
                />
            </InputContainer>

            <InputContainer>
              <label
                htmlFor="url">
                  URL
                </label>
                <input
                  type="url"
                  id="url"
                  name="url"
                  value={url}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
            </InputContainer>
            { errors.url && <Error>{errors.url}</Error>}
            </fieldset>
            
            <fieldset>
              <legend>
                Sobre tu producto
              </legend>
              <InputContainer>
              <label
                htmlFor="desc">
                  Descripción
                </label>
                <textarea
                  id="desc"
                  name="desc"
                  value={desc}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
            </InputContainer>
            { errors.desc && <Error>{errors.desc}</Error>}
            </fieldset>

            {error && <Error>{error}</Error>}
            <InputSubmit
              type="submit"
              value="Agregar producto"
            />
          </Form>
        </>
        }
      </Layout>
    </div>
  )
}

export default NewProduct;