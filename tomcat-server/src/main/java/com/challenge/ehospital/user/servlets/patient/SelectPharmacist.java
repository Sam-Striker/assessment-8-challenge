package com.challenge.ehospital.user.servlets.patient;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.challenge.ehospital.database.PatientDB;
import com.challenge.ehospital.database.PharmacistDB;
import com.challenge.ehospital.user.models.Patient;
import com.challenge.ehospital.user.models.Pharmacist;
import com.challenge.ehospital.utils.JwtUtil;
import com.challenge.ehospital.utils.RequestUtil;
import com.challenge.ehospital.utils.ResFormat;
import com.challenge.ehospital.utils.ResponseEntity;

@WebServlet("/patient/choosePharmacist")
public class SelectPharmacist extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
        try {
            String requestBody = RequestUtil.getBody(req);
            String pharmacistPhone = RequestUtil.getKeyFromJson(requestBody, "pharmacistPhone");

            String jwtToken = JwtUtil.extractToken(req);

            String username = JwtUtil.fromJwtTokenGet(jwtToken);
            Patient patient = PatientDB.findPatient(username);

            Pharmacist pharmacistExists = PharmacistDB.findPharmacist(pharmacistPhone);

            if (pharmacistExists == null) {
                throw new IllegalArgumentException("Pharmacist not found");
            }
            Patient result = PatientDB.selectPharmacist(patient.getUsername(), pharmacistExists);
            ResFormat.res(res, new ResponseEntity<Patient>("selected pharmacist successfully", result),
                    HttpServletResponse.SC_OK);

        } catch (Exception e) {
            e.printStackTrace();
            ResFormat.res(res, new ResponseEntity<>(e.getMessage(), null), HttpServletResponse.SC_FORBIDDEN);
        }
    }
}