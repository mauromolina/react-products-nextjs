export default function validateNewAccount(values) {

    let errors = {};

    if(!values.name){
        errors.name = 'El nombre es obligatorio'
    }

    if(!values.enterprise){
        errors.enterprise = 'El nombre de la empresa es obligatorio'
    }

    if(!values.url){
        errors.url = 'La url del producto es obligatoria'
    } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(values.url)){
        errors.url = 'La url no es válida'
    }

    if(!values.desc){
        errors.desc = 'Se debe agregar una descripción para el producto'
    }



    return errors;

}