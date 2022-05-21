package com.fcfm.dao;
import com.fcfm.quicknotes.DbConnection;
import com.fcfm.models.Usuario;
import java.nio.ByteBuffer;
import java.nio.ByteOrder;
import java.sql.Connection;
import java.sql.CallableStatement;
import java.sql.ResultSet;
import java.sql.Timestamp;
import java.util.UUID;

public class UsuarioDAO {
    
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
    
    public String NuevoUsuario(Usuario new_usuario) {
        if (!getConnection())
            return null;
        if (!new_usuario.ValidarCampos())
            return "invalid_info";
        try {
            CallableStatement stmt = conn.prepareCall("call registrar_usuario(?, ?, ?, ?, ?, ?);");
            stmt.setString(1, new_usuario.getNombres());
            stmt.setString(2, new_usuario.getApellidos());
            stmt.setDate(3, new java.sql.Date(new_usuario.getFecha_nac().getTime()));
            stmt.setString(4, new_usuario.getCorreo_e());
            stmt.setString(5, new_usuario.getUsername());
            stmt.setString(6, new_usuario.getPassword());
            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                return rs.getString("result");
            }
        }
        catch(Exception e) {
            System.out.println(e);
        }
        finally {
            closeConnection();
        }
        return null;
    }
    
    public boolean EditarUsuario(Usuario new_usuario) {
        if (!getConnection())
            return false;
        if (!new_usuario.ValidarCampos())
            return false;
        try {
            CallableStatement stmt = conn.prepareCall("call editar_usuario(?, ?, ?, ?, ?, ?, ?, ?);");
            stmt.setString(1, new_usuario.getId_usuario());
            stmt.setString(2, new_usuario.getNombres());
            stmt.setString(3, new_usuario.getApellidos());
            stmt.setNull(4, 0);
            stmt.setDate(5, new java.sql.Date(new_usuario.getFecha_nac().getTime()));
            stmt.setString(6, new_usuario.getCorreo_e());
            stmt.setString(7, new_usuario.getUsername());
            stmt.setString(8, new_usuario.getPassword());
            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                System.out.println(rs.getString("result"));
                return true;
            }
        }
        catch(Exception e) {
            System.out.println(e);
        }
        finally {
            closeConnection();
        }
        return false;
    }
    
    public Usuario LoginUsuario(String correo, String password) {
        if (!getConnection())
            return null;
        try {
            CallableStatement stmt = conn.prepareCall("call login_usuario(?, ?);");
            stmt.setString(1, correo);
            stmt.setString(2, password);
            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                String result = rs.getString("result");
                Usuario resUs;
                if (result.contentEquals("user_no_exists") | result.contentEquals("wrong_password")) {
                    resUs = new Usuario(
                            null, null, null, null,
                            null, null, null, null,
                            null, null, false, result
                    );
                }
                else {
                    resUs = new Usuario(
                            UUID.fromString(rs.getString("ID")),
                            null, null, null, null,
                            rs.getString("Correo electronico"),
                            rs.getString("Nombre de usuario"),
                            null, null, null, false,
                            result
                    );
                }
                return resUs;
            }
        }
        catch(Exception e) {
            System.out.println(e);
        }
        finally {
            closeConnection();
        }
        return null;
    }
    
    public void ConsultarUsuarios() {
        if (!getConnection())
            return;
        try {
            CallableStatement stmt = conn.prepareCall("call consultar_usuarios();");
            ResultSet rs = stmt.executeQuery();
            while(rs.next()) {
                Timestamp ts = rs.getTimestamp("Fecha de creacion");
                Usuario usn = new Usuario(
                        UUID.fromString(rs.getString("ID")),
                        rs.getString("Nombres"),
                        rs.getString("Apellidos"),
                        null,
                        rs.getString("Fecha de nacimiento"),
                        rs.getString("Correo electronico"),
                        rs.getString("Usuario"),
                        rs.getString("Contrasena"),
                        null,
                        new java.util.Date(ts.getTime()),
                        rs.getBoolean("Activo"),
                        null
                );
                System.out.println(usn);
            }
        }
        catch (Exception e) {
            System.out.println(e);
        }
        finally {
            closeConnection();
        }
    }
    
    public Usuario ConsultarUsuarioPorID(UUID id) {
        if (!getConnection())
            return null;
        try {
            CallableStatement stmt = conn.prepareCall("call consultar_usuario_id(?);");
            stmt.setString(1, id.toString());
            ResultSet rs = stmt.executeQuery();
            if(rs.next()) {
                Timestamp ts = rs.getTimestamp("Fecha de creacion");
                Usuario usn = new Usuario(
                        UUID.fromString(rs.getString("ID")),
                        rs.getString("Nombres"),
                        rs.getString("Apellidos"),
                        null,
                        rs.getString("Fecha de nacimiento"),
                        rs.getString("Correo electronico"),
                        rs.getString("Usuario"),
                        rs.getString("Contrasena"),
                        null,
                        new java.util.Date(ts.getTime()),
                        rs.getBoolean("Activo"),
                        null
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
    
    public boolean BorrarUsuario(UUID id) {
        if (!getConnection())
            return false;
        try {
            CallableStatement stmt = conn.prepareCall("call borrar_usuario(?);");
            stmt.setString(1, id.toString());
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