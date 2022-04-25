package com.fcfm.models;

import java.util.UUID;
import java.util.Date;
import java.nio.ByteBuffer;
import java.nio.ByteOrder;
import java.sql.Blob;
import java.util.regex.Pattern;
import java.text.SimpleDateFormat;

public class Usuario {
    
    private UUID id_usuario;
    private String nombres;
    private String apellidos;
    private Blob foto_perfil;
    private Date fecha_nac = null;
    private String correo_e;
    private String username;
    private String password;
    private String confirm_password;
    private Date fecha_creacion;
    private boolean activo;
    
    // Constructo
    public Usuario (
        UUID id_usuario,
        String nombres,
        String apellidos,
        Blob foto_perfil,
        String fecha_nac,
        String correo_e,
        String username,
        String password,
        String confirmPassword,
        Date fecha_creacion,
        boolean activo
    ) {
        this.id_usuario = id_usuario;
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.foto_perfil = foto_perfil;
        try {
            this.fecha_nac = new SimpleDateFormat("yyyy-MM-dd").parse(fecha_nac);
        }
        catch(Exception e) {
            System.out.println(e);
        }
        this.correo_e = correo_e;
        this.username = username;
        this.password = password;
        this.confirm_password = confirmPassword;
        this.fecha_creacion = fecha_creacion;
        this.activo = activo;
    }
    
    // Sobrecargas
    @Override public String toString() {
        return
            getId_usuario().toString() + " | " + getNombres() + " " + getApellidos() + " | " +
            getFecha_nac().toString() + " | " + getCorreo_e() + ": " + getUsername() + "/" + getPassword() + " | " +
            getFecha_creacion().toString();
    }
    
    // Validaciones
    private boolean noNumbers(String value) {
        Pattern pattern = Pattern.compile("\\d");
        boolean res = pattern.matcher(value).find();
        return !res;
    }
    
    private boolean validEmail() {
        Pattern pattern = Pattern.compile("^(.+)@(.+)$");
        boolean res = pattern.matcher(this.correo_e).matches();
        return res;
    }
    
    private boolean validPassword() {
        Pattern pattern = Pattern.compile(".*^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()_+|~=`{}\\[\\]:\";'<>?,./-]).{8,16}$*");
        boolean res = pattern.matcher(this.password).matches();
        return res;
    }
    
    private boolean validDate() {
        if (this.fecha_nac == null)
            return false;
        Date hoy = new Date();
        hoy.getTime();
        boolean res = hoy.after(this.fecha_nac);
        return res;
    }
    
    public boolean ValidarCampos() {
        
        boolean res = true;
        
        // Check empty
        if (this.nombres.isEmpty()){
            System.out.println("¡Los Nombres están vacíos!");
            res = false;
        }
        if (this.apellidos.isEmpty()){
            System.out.println("¡Los Apellidos están vacíos!");
            res = false;
        }
        if (this.fecha_nac == null){
            System.out.println("¡La fecha de nacimiento está vacía!");
            res = false;
        }
        if (this.correo_e.isEmpty()){
            System.out.println("¡El correo electrónico está vacío!");
            res = false;
        }
        if (this.username.isEmpty()){
            System.out.println("¡El Username está vacío!");
            res = false;
        }
        if (this.password.isEmpty()){
            System.out.println("¡La contraseña está vacía!");
            res = false;
        }
        
        // Check valid
        if (!validDate()){
            System.out.println("¡Fecha de nacimineto inválida! La fecha pasa del día de hoy.");
            res = false;
        }
        if (!noNumbers(this.nombres)){
            System.out.println("¡Nombre inválido! Contiene números.");
            res = false;
        }
        if (!noNumbers(this.apellidos)){
            System.out.println("¡Apellido inválido! Contiene números.");
            res = false;
        }
        if (!validEmail()){
            System.out.println("¡Formato de correo electrónico inválido!");
            res = false;
        }
        if (!validPassword()){
            System.out.println("¡Contraseña no cumple con el formato!: Almenos 8 caracteres, una mayúscula, una minúscula, un número, un signo.");
            res = false;
        }
        if (!password.contentEquals(confirm_password)) {
            System.out.println("¡No se pudo confirmar contraseña! No coinciden.");
            res = false;
        }
        
        return res;
    }

    // Getters
    public UUID getId_usuario() {
        return id_usuario;
    }
    
    public byte[] getId_usuario_bytes() {
        byte[] uuidBytes = new byte[16];
        ByteBuffer.wrap(uuidBytes)
        .order(ByteOrder.BIG_ENDIAN)
        .putLong(id_usuario.getMostSignificantBits())
        .putLong(id_usuario.getLeastSignificantBits());
        return uuidBytes;
    }

    public String getNombres() {
        return nombres;
    }

    public String getApellidos() {
        return apellidos;
    }
    
    public Blob getFoto_perfil() {
        return foto_perfil;
    }

    public Date getFecha_nac() {
        return fecha_nac;
    }

    public String getCorreo_e() {
        return correo_e;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public Date getFecha_creacion() {
        return fecha_creacion;
    }

    public boolean isActive() {
        return activo;
    }

    // Setters
    public void setNombres(String nombres) {
        this.nombres = nombres;
    }

    public void setApellidos(String apellidos) {
        this.apellidos = apellidos;
    }

    public void setFoto_perfil(Blob foto_perfil) {
        this.foto_perfil = foto_perfil;
    }

    public void setFecha_nac(Date fecha_nac) {
        this.fecha_nac = fecha_nac;
    }

    public void setCorreo_e(String correo_e) {
        this.correo_e = correo_e;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }
    
}