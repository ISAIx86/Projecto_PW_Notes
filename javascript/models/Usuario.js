class Usuario {

    constructor(name, l_name, date, email, username, password) {
        this.nombres = name;
        this.apellidos = l_name;
        this.f_nac = date;
        this.email = email;
        this.usuario = username;
        this.contra = password;
    }

    stringify() {
        return this.nombres + ',' +
        this.apellidos + ',' +
        this.f_nac + ',' +
        this.email + ',' +
        this.usuario + ',' +
        this.contra;
    }

}