/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package com.fcfm.controllers;
import com.fcfm.dao.NotasDAO;
import java.util.List;
import com.fcfm.models.Notas;
import com.fcfm.models.Usuario;
import com.google.gson.Gson;

import java.io.IOException;
import java.io.PrintWriter;
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
@WebServlet(name = "MainPage", urlPatterns = {"/MainPage"})
public class MainPage extends HttpServlet {

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
        
        HttpSession session = request.getSession();
        Usuario usr = (Usuario)session.getAttribute("user");
        NotasDAO notdao = new NotasDAO();
        List<Notas> lista = notdao.ConsultarNotasUsuario(UUID.fromString(usr.getId_usuario()), 1, 10);
        int total_notas = notdao.CantidadNotas(UUID.fromString(usr.getId_usuario()));
        float divider = (float)total_notas / 10;
        int paginas = (int) Math.ceil(divider);
        
        request.setAttribute("notelist", lista);
        request.setAttribute("maxpages", paginas);
        
        request.getRequestDispatcher("Main_Page.jsp").forward(request, response);
        
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
        
        HashMap result = new HashMap();
        NotasDAO notdao = new NotasDAO();
        HttpSession session = request.getSession();
        
        Usuario usr = (Usuario)session.getAttribute("user");
        
        Notas newnota = new Notas(
                null,
                UUID.fromString(usr.getId_usuario()),
                request.getParameter("titulo"),
                request.getParameter("contenido"),
                null,
                false
        );
        
        boolean isCreated = notdao.NuevaNota(newnota);
        
        if(isCreated) {
            result.put("resultado", true);
            result.put("razon", "Nota creada!");
        }
        else {
            result.put("resultado", false);
            result.put("razon", "Algo salió mal.");
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
