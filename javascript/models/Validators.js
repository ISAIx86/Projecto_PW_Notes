function setCSSFor(input, _class, message="") {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    switch(_class) {
        case 'normal':
            small.innerText = "";
            formControl.className='form-control';
            break;
        case 'error':
            small.innerText = message;
            formControl.className='form-control error';
            break;
        case 'success':
            small.innerText = "";
            formControl.className='form-control success';
            break;
        default:
            small.innerText = "";
            formControl.className='form-control';
            break;
    }
}

function setStateFor(input, state) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    switch(state) {
        case 'normal':
            formControl.setAttribute("estado", "vacio");
            break;
        case 'error':
            formControl.setAttribute("estado", "novalido");
            break;
        case 'success':
            formControl.setAttribute("estado", "correcto");
            break;
        default:
            formControl.setAttribute("estado", "vacio");
            break;
    }
}

function noNumbers(input) {
    return !/\d/.test(input);
}

function validDate(birth) {
    let today = new Date();
    if (birth >= today)
        return false;
    else return true;
}

function validPassword(password) {
    return /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()_+|~=`{}\[\]:";'<>?,./-]).{8,}$/.test(password);
}

function validEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1.3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}