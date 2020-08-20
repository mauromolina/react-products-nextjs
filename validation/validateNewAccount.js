export default function validateNewAccount(values) {

    let errors = {};

    if(!values.name){
        errors.name = 'El nombre es obligatorio'
    }

    if(!values.email){
        errors.email = 'El email es obligatorio'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)){
        errors.email = 'Email inválido'
    }

    if(!values.password) {
        errors.password = 'La contraseña es obligatoria'
    } else if ( values.password.length < 6) {
        errors.password = 'La contraseña debe contener como mínimo 6 caractéres'
    }

    return errors;

}