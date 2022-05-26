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
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.UUID;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 *
 * @author alexi
 */
@WebServlet(name = "EditarPerfil", urlPatterns = {"/EditarPerfil"})
public class EditarPerfil extends HttpServlet {

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
        
        UsuarioDAO usdao = new UsuarioDAO();
        HttpSession session = request.getSession();
        Usuario usr = (Usuario)session.getAttribute("user");
        Usuario usrData = usdao.ConsultarUsuarioPorID(UUID.fromString(usr.getId_usuario()));
        
        DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
        String fechastring = df.format(usrData.getFecha_nac());
        
        request.setAttribute("userdata", usrData);
        
        request.getRequestDispatcher("Perfil_Usuario.jsp").forward(request, response);
        
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        HttpSession session = request.getSession();
        Usuario usr = (Usuario)session.getAttribute("user");
        HashMap result = new HashMap();
        UsuarioDAO usdao = new UsuarioDAO();
        
        Usuario edit = new Usuario(
            UUID.fromString(usr.getId_usuario()),
            request.getParameter("Nombres"),
            request.getParameter("Apellidos"),
            null,
            request.getParameter("Fecha_nacimiento"),
            request.getParameter("Correo_electronico"),
            usr.getUsername(),
            request.getParameter("Contrasena"),
            request.getParameter("Confirmar_contra"),
            null,
            false,
            null
        );
        
        boolean edited = usdao.EditarUsuario(edit);
        
        if (edited) {
            Usuario new_edit = usdao.ConsultarUsuarioPorID(UUID.fromString(usr.getId_usuario()));
            Usuario newsession = new Usuario(
                    UUID.fromString(usr.getId_usuario()),
                    null,
                    null,
                    null,
                    null,
                    new_edit.getCorreo_e(),
                    new_edit.getUsername(),
                    null, null, null, false,
                    null
            );
            session.setAttribute("user", newsession);
            result.put("resultado", true);
            result.put("razon", "Usuario editado.");
        }
        else {
            result.put("resultado", false);
        }
        String json = new Gson().toJson(result);
        PrintWriter out = response.getWriter();
        out.print(json);
        out.flush();
        
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
