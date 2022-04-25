package com.fcfm.quicknotes;

import java.sql.Connection;
import java.sql.DriverManager;

public class DbConnection {
    
    private static DbConnection instance = null;
    
    private static final String DBName = "quicknotes_db";
    private static final String USER = "root";
    private static final String PASSWORD = "UTnD8F7Z6";
    private static final String URL = "jdbc:mysql://localhost:3306/"+DBName+"?useUnicode=true&use" +
                                      "JDBCCompliantTimezoneShift=true&useLegacyDatetimeCode=flase&" +
                                      "serverTimezone=UTC";
    
    Connection conn = null;
    
    public static DbConnection getInstance() {
        if (instance == null) {
            instance = new DbConnection();
        }
        return instance;
    }
    
    public Connection conectar() {
        try {
            if (conn == null)
            Class.forName("com.mysql.cj.jdbc.Driver");
            conn = DriverManager.getConnection(URL, USER, PASSWORD);
            return conn;
        }
        catch (Exception e) {
            System.out.println(e);
        }
        return null;
    }
    
    public Connection getConn() {
        return conn;
    }
    
    public void desconectar() {
        try {
            if (conn != null){
                conn.close();
                conn = null;
            }
        }
        catch(Exception e) {
            System.out.println(e);
        }
    }
    
}