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
@WebServlet(name = "GestionNotas", urlPatterns = {"/GestionNotas"})
public class GestionNotas extends HttpServlet {

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
        String idnota = request.getParameter("notaID");
        Notas edit_nota = new Notas(
                UUID.fromString(idnota),
                null,
                request.getParameter("nTitulo"),
                request.getParameter("nContenido"),
                null,
                false
        );
        boolean edited = notdao.EditarNota(edit_nota);
        edit_nota = notdao.ConsultarNota(UUID.fromString(idnota));
        if (edited & edit_nota != null) {
            result.put("resultado", true);
            result.put("nota", edit_nota);
        }
        else{
            result.put("resultado", false);
        }
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
        HashMap result = new HashMap();
        HttpSession session = request.getSession();
        Usuario usr = (Usuario)session.getAttribute("user");
        int currentpage = Integer.parseInt(request.getParameter("currentPage"));
        NotasDAO notdao = new NotasDAO();
        String idnota = request.getParameter("notaID");
        boolean deleted = notdao.BorrarNotas(UUID.fromString(idnota));
        if (deleted) {
            List<Notas> contadorPag = notdao.ConsultarNotasUsuario(UUID.fromString(usr.getId_usuario()), currentpage, 10);
            if (contadorPag.isEmpty()) {
                currentpage--;
                if (currentpage != 0) {
                    contadorPag = notdao.ConsultarNotasUsuario(UUID.fromString(usr.getId_usuario()), currentpage, 10);
                    int total_notas = notdao.CantidadNotas(UUID.fromString(usr.getId_usuario()));
                    float divider = (float)total_notas / 10;
                    int paginas = (int) Math.ceil(divider);
                    if (!contadorPag.isEmpty()) {
                        result.put("resultado", true);
                        result.put("pagvacia", true);
                        result.put("maxpags", paginas);
                        result.put("currentpag", currentpage);
                        result.put("listanotas", contadorPag);
                    }
                    else {
                        result.put("resultado", false);
                        result.put("vacio", true);
                    }
                }
                else {
                    result.put("resultado", false);
                    result.put("vacio", true);
                }
            }
            else {
                result.put("resultado", true);
                result.put("pagvacia", false);
                result.put("listanotas", contadorPag);
            }
        }
        else {
            result.put("resultado", false);
            result.put("vacio", false);
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
