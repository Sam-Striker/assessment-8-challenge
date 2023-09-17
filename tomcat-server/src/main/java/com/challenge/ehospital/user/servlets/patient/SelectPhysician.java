package com.challenge.ehospital.user.servlets.patient;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.challenge.ehospital.database.PatientDB;
import com.challenge.ehospital.database.PhysicianDB;
import com.challenge.ehospital.user.models.Patient;
import com.challenge.ehospital.user.models.Physician;
import com.challenge.ehospital.utils.JwtUtil;
import com.challenge.ehospital.utils.RequestUtil;
import com.challenge.ehospital.utils.ResFormat;
import com.challenge.ehospital.utils.ResponseEntity;

@WebServlet("/patient/choosePhysician")
public class SelectPhysician extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
        try {
            String requestBody = RequestUtil.getBody(req);
            String physicianEmail = RequestUtil.getKeyFromJson(requestBody, "physicianEmail");

            String jwtToken = JwtUtil.extractToken(req);

            String username = JwtUtil.fromJwtTokenGet(jwtToken);
            Patient patient = PatientDB.findPatient(username);

            Physician physicianExists = PhysicianDB.findPhysician(physicianEmail);

            if (physicianExists == null) {
                throw new IllegalArgumentException("Physician not found");
            }
            Patient result = PatientDB.selectPhysician(patient.getUsername(), physicianExists);
            ResFormat.res(res, new ResponseEntity<Patient>("selected physician successfully", result),
                    HttpServletResponse.SC_OK);

        } catch (Exception e) {
            e.printStackTrace();
            ResFormat.res(res, new ResponseEntity<>(e.getMessage(), null), HttpServletResponse.SC_FORBIDDEN);
        }
    }
}