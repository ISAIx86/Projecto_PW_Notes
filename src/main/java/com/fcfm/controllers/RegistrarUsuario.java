/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package com.fcfm.controllers;
import com.fcfm.dao.UsuarioDAO;
import com.fcfm.models.Usuario;
import com.google.gson.Gson;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author alexi
 */
@WebServlet(name = "RegistrarUsuario", urlPatterns = {"/RegistrarUsuario"})
public class RegistrarUsuario extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }
    
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        HashMap result = new HashMap();
        UsuarioDAO usdao = new UsuarioDAO();
        
        Usuario nuevoUs = new Usuario(
            null,
            request.getParameter("Nombres"),
            request.getParameter("Apellidos"),
            null,
            request.getParameter("Fecha de nacimiento"),
            request.getParameter("Correo electrónico"),
            request.getParameter("Nombre de usuario"),
            request.getParameter("Contraseña"),
            request.getParameter("Confirmar contraseña"),
            null,
            false
        );
        
        String daores = usdao.NuevoUsuario(nuevoUs);
        
        switch(daores) {
            case "invalid_info":
                result.put("resultado", false);
                result.put("razon", "Datos de usuario no válidos.");
                break;
            case "already_exists":
                result.put("resultado", false);
                result.put("razon", "El correo electrónico y/o usuario ya existen.");
                break;
            case "registered_user":
                result.put("resultado", true);
                result.put("razon", "Registrado con exito.");
                break;
            default:
                result.put("resultado", false);
                result.put("razon", "Error fatal en el server.");
                break;
        }
            String json = new Gson().toJson(result);
            PrintWriter out = response.getWriter();
            out.print(json);
            out.flush();
    }

    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
