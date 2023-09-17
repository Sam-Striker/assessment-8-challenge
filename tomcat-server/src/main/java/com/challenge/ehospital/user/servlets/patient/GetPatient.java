package com.challenge.ehospital.user.servlets.patient;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.challenge.ehospital.database.PatientDB;
import com.challenge.ehospital.user.models.Patient;
import com.challenge.ehospital.utils.JwtUtil;
import com.challenge.ehospital.utils.ResFormat;
import com.challenge.ehospital.utils.ResponseEntity;

@WebServlet("/patient/get")
public class GetPatient extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
        try {
            String jwtToken = JwtUtil.extractToken(req);

            String username =  JwtUtil.fromJwtTokenGet(jwtToken);
            Patient patient = PatientDB.findPatient(username);

            if (patient == null) {
                throw new IllegalArgumentException("Patient not found", null);
            }

            ResFormat.res(res, new ResponseEntity<Patient>("patient retrieved successfully", patient),
                    HttpServletResponse.SC_OK);
        } catch (Exception e) {
            e.printStackTrace();
            ResFormat.res(res, new ResponseEntity<>(e.getMessage(), null), HttpServletResponse.SC_NOT_FOUND);
        }
    }
}
