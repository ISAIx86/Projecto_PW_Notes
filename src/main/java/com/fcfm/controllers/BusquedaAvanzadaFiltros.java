/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package com.fcfm.controllers;

import com.fcfm.dao.NotasDAO;
import com.fcfm.models.Notas;
import com.fcfm.models.Usuario;
import com.google.gson.Gson;
import java.io.IOException;
import java.io.PrintWriter;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
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
@WebServlet(name = "BusquedaAvanzadaFiltros", urlPatterns = {"/BusquedaAvanzadaFiltros"})
public class BusquedaAvanzadaFiltros extends HttpServlet {

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
        response.setContentType("text/html;charset=UTF-8");
        try ( PrintWriter out = response.getWriter()) {
            /* TODO output your page here. You may use following sample code. */
            out.println("<!DOCTYPE html>");
            out.println("<html>");
            out.println("<head>");
            out.println("<title>Servlet BusquedaAvanzadaFiltros</title>");            
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Servlet BusquedaAvanzadaFiltros at " + request.getContextPath() + "</h1>");
            out.println("</body>");
            out.println("</html>");
        }
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
        
        HashMap result = new HashMap();
        NotasDAO notdao = new NotasDAO();
        HttpSession session = request.getSession();
        
        Usuario usr = (Usuario)session.getAttribute("user");
        String str_currpag = request.getParameter("currentPage");
        String str_cont = request.getParameter("contenido");
        int currpag = 1;
        if (str_currpag != null)
            currpag = Integer.parseInt(str_currpag);
        if (str_cont == null)
            str_cont = "";
        
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        String str_startdate = request.getParameter("startDate");
        String str_enddate = request.getParameter("endDate");
        boolean hasStartDate = false;
        boolean hasEndDate = false;
        LocalDateTime startDate = null;
        LocalDateTime endDate = null;
        if (!str_startdate.contentEquals("")) {
            startDate = LocalDateTime.parse(str_startdate + " 00:00:00", formatter);
            hasStartDate = true;
        }
        if (!str_enddate.contentEquals("")) {
            endDate = LocalDateTime.parse(str_enddate + " 23:59:59", formatter);
            hasEndDate = true;
        }
        
        List<Notas> resultset = null;
        if (hasStartDate & hasEndDate) {
            resultset = notdao.BusquedaAvanzada(
                UUID.fromString(usr.getId_usuario()),
                currpag,
                10,
                str_cont,
                startDate,
                endDate
            );
        }
        else if (hasStartDate) {
            resultset = notdao.BusquedaAvanzada(
                UUID.fromString(usr.getId_usuario()),
                currpag,
                10,
                str_cont,
                startDate
            );
        }
        else if (hasEndDate) {
            resultset = notdao.BusquedaAvanzada(
                UUID.fromString(usr.getId_usuario()),
                currpag,
                10,
                str_cont,
                endDate,
                ""
            );
        }
        else {
            resultset = notdao.BusquedaAvanzada(
                UUID.fromString(usr.getId_usuario()),
                currpag,
                10,
                str_cont
            );
        }
        
        int total_notas = resultset.size();
        float divider = (float)total_notas / 10;
        int paginas = (int) Math.ceil(divider);
        
        result.put("resultado", true);
        result.put("maxpages", paginas);
        result.put("notasresult", resultset);
        
        String json = new Gson().toJson(result);
        PrintWriter out = response.getWriter();
        out.print(json);
        out.flush();
        
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
