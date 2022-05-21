package com.fcfm.models;
import java.nio.ByteBuffer;
import java.nio.ByteOrder;
import java.util.UUID;
import java.util.Date;

public class Notas {
    
    private UUID id_nota;
    private UUID id_usuario;
    private String titulo;
    private String contenido;
    private Date fecha_creacion;
    private boolean activo;
    
    // Constructores
    public Notas(UUID idnota, UUID iduser, String titulo, String contenido, Date fechacreacion, boolean activo) {
        this.id_nota = idnota;
        this.id_usuario = iduser;
        this.titulo = titulo;
        this.contenido = contenido;
        this.fecha_creacion = fechacreacion;
        this.activo = activo;
    }
    
    // Sobrecargas
    @Override public String toString() {
        return id_nota.toString() + " | " + id_usuario.toString() + " | " + titulo + ": " + contenido + " | " + fecha_creacion.toString(); 
    }

    // Validaciones
    public boolean ValidarPropietario() {
        boolean res = true;
        if (this.id_usuario == null) {
            System.out.println("¡Nota sin propietario!");
            res = false;
        }
        return res;
    }
    
    public boolean ValidarCampos() {
        boolean res = true;
        if (this.titulo.isEmpty()) {
            System.out.println("¡Nota sin título!.");
            res = false;
        }
        return res;
    }
    
    // Getters
    public String getId_nota() {
        return id_nota.toString();
    }

    public String getId_usuario() {
        return id_usuario.toString();
    }

    public String getTitulo() {
        return titulo;
    }

    public String getContenido() {
        return contenido;
    }

    public Date getFecha_creacion() {
        return fecha_creacion;
    }

    public boolean isActive() {
        return activo;
    }

    // Setters
    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public void setContenido(String contenido) {
        this.contenido = contenido;
    }
    
}