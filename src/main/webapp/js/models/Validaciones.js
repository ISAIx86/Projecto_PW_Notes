function setCSSFor(input, _class, message) {
    const formControl = input.parentElement;
    const sm = formControl.querySelector('small');
    switch(_class) {
        case 'normal':
            sm.innerText = message;
            formControl.className='form-label-group';
            formControl.setAttribute('state', 'mt');
            break;
        case 'error':
            sm.innerText = message;
            formControl.className='form-label-group error';
            formControl.setAttribute('state', 'nv');
            break;
        case 'success':
            formControl.className='form-label-group success';
            formControl.setAttribute('state', 'sc');
            break;
        default:
            formControl.className='form-label-group';
            formControl.setAttribute('state', 'mt');
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