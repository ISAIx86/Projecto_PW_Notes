class Usuario {

    constructor(name, l_name, username, date, email, password) {
        this.nombres = name;
        this.apellidos = l_name;
        this.usuario = username;
        this.f_nac = date;
        this.email = email;
        this.contra = password;
    }

    stringify() {
        return this.nombres + ',' +
        this.apellidos + ',' +
        this.usuario + ',' +
        this.f_nac + ',' +
        this.email + ',' +
        this.contra;
    }

}