package com.fcfm.dao;

import com.fcfm.quicknotes.DbConnection;
import com.fcfm.models.Notas;
import java.nio.ByteBuffer;
import java.nio.ByteOrder;
import java.sql.Connection;
import java.util.UUID;
import java.util.List;
import java.util.ArrayList;
import java.sql.Timestamp;
import java.sql.CallableStatement;
import java.sql.ResultSet;

public class NotasDAO {
    
    private DbConnection dbconn = null;
    private Connection conn = null;
    
    private boolean getConnection() {
        dbconn = DbConnection.getInstance();
        if (dbconn != null){
            conn = dbconn.conectar();
            if (conn != null)
                return true;
            else return false;
        }
        else return false;
    }
    
    private void closeConnection() {
        dbconn.desconectar();
        conn = null;
    }
    
    public boolean NuevaNota(Notas new_nota) {
        if (!getConnection())
            return false;
        if (!new_nota.ValidarPropietario())
            return false;
        if (!new_nota.ValidarCampos())
            return false;
        try {
            CallableStatement stmt = conn.prepareCall("call nueva_nota(?, ?, ?);");
            stmt.setString(1, new_nota.getId_usuario());
            stmt.setString(2, new_nota.getTitulo());
            stmt.setString(3, new_nota.getContenido());
            stmt.executeUpdate();
            return true;
        }
        catch (Exception e) {
            System.out.println(e);
        }
        finally {
            closeConnection();
        }
        return false;
    }
    
    public boolean EditarNota(Notas new_nota) {
        if (!getConnection())
            return false;
        if (!new_nota.ValidarCampos())
            return false;
        try {
            CallableStatement stmt = conn.prepareCall("call editar_nota(?, ?, ?);");
            stmt.setString(1, new_nota.getId_nota());
            stmt.setString(2, new_nota.getTitulo());
            stmt.setString(3, new_nota.getContenido());
            stmt.executeUpdate();
            return true;
        }
        catch (Exception e) {
            System.out.println(e);
        }
        finally {
            closeConnection();
        }
        return false;
    }
    
    public List<Notas> ConsultarNotasUsuario(UUID id_usuario, int pag, int size) {
        if (!getConnection())
            return null;
        try {
            CallableStatement stmt = conn.prepareCall("call consulta_notas_usuario(?, ?, ?);");
            stmt.setString(1, id_usuario.toString());
            stmt.setInt(2, pag);
            stmt.setInt(3, size);
            ResultSet rs = stmt.executeQuery();
            List<Notas> returnlist = new ArrayList<Notas>();
            while(rs.next()) {
                Timestamp ts = rs.getTimestamp("Fecha de creacion");
                Notas usn = new Notas(
                        UUID.fromString(rs.getString("ID")),
                        UUID.fromString(rs.getString("UserID")),
                        rs.getString("Titulo"),
                        rs.getString("Contenido"),
                        new java.util.Date(ts.getTime()),
                        rs.getBoolean("Activo")
                );
                returnlist.add(usn);
                System.out.println(usn.toString());
            }
            return returnlist;
        }
        catch (Exception e) {
            System.out.println(e);
        }
        finally {
            closeConnection();
        }
        return null;
    }
    
    public int CantidadNotas(UUID id_usuario) {
        if (!getConnection())
            return -1;
        try {
            CallableStatement stmt = conn.prepareCall("call cantidad_notas_usuario(?);");
            stmt.setString(1, id_usuario.toString());
            ResultSet rs = stmt.executeQuery();
            while(rs.next()) {
                return rs.getInt("Total");
            }
        }
        catch (Exception e) {
            System.out.println(e);
        }
        finally {
            closeConnection();
        }
        return -1;
    }
    
    public Notas ConsultarNota(UUID id_nota) {
        if (!getConnection())
            return null;
        try {
            CallableStatement stmt = conn.prepareCall("call consulta_nota(?);");
            stmt.setString(1, id_nota.toString());
            ResultSet rs = stmt.executeQuery();
            if(rs.next()) {
                Timestamp ts = rs.getTimestamp("Fecha de creacion");
                Notas usn = new Notas(
                        UUID.fromString(rs.getString("ID")),
                        UUID.fromString(rs.getString("UserID")),
                        rs.getString("Titulo"),
                        rs.getString("Contenido"),
                        new java.util.Date(ts.getTime()),
                        rs.getBoolean("Activo")
                );
                return usn;
            }
        }
        catch (Exception e) {
            System.out.println(e);
        }
        finally {
            closeConnection();
        }
        return null;
    }
    
    public boolean BorrarNotas(UUID id_nota) {
        if (!getConnection())
            return false;
        try {
            CallableStatement stmt = conn.prepareCall("call borrar_nota(?);");
            stmt.setString(1, id_nota.toString());
            stmt.executeUpdate();
            return true;
        }
        catch (Exception e) {
            System.out.println(e);
        }
        finally {
            closeConnection();
        }
        return false;
    }
    
}