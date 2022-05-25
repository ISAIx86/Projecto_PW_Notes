/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package com.fcfm.controllers;

import com.fcfm.dao.NotasDAO;
import com.fcfm.models.Notas;
import com.fcfm.models.Usuario;
import java.io.IOException;
import java.io.PrintWriter;
import java.time.LocalDateTime;
import java.util.List;
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
@WebServlet(name = "BusquedaAvanzada", urlPatterns = {"/BusquedaAvanzada"})
public class BusquedaAvanzada extends HttpServlet {

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
        NotasDAO notdao = new NotasDAO();
        Usuario usr = (Usuario)session.getAttribute("user");
        String bycontent = request.getParameter("contenido");
        List<Notas> resultset = notdao.BusquedaAvanzada(
                UUID.fromString(usr.getId_usuario()),
                1,
                10,
                bycontent
        );
        if (resultset == null)
            request.getRequestDispatcher("MainPage").forward(request, response);
        int total_notas = resultset.size();
        float divider = (float)total_notas / 10;
        int paginas = (int) Math.ceil(divider);
        
        request.setAttribute("noteresult", resultset);
        request.setAttribute("maxpages", paginas);
        request.setAttribute("bycontent", bycontent);
        
        request.getRequestDispatcher("Busqueda_Avanzada.jsp").forward(request, response);
        
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
        processRequest(request, response);
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
