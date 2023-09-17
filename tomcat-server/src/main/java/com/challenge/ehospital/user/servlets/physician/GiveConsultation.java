package com.challenge.ehospital.user.servlets.physician;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.challenge.ehospital.database.PatientDB;
import com.challenge.ehospital.database.PhysicianDB;
import com.challenge.ehospital.user.models.Consultation;
import com.challenge.ehospital.user.models.Patient;
import com.challenge.ehospital.user.models.Physician;
import com.challenge.ehospital.utils.JwtUtil;
import com.challenge.ehospital.utils.RequestUtil;
import com.challenge.ehospital.utils.ResFormat;
import com.challenge.ehospital.utils.ResponseEntity;

@WebServlet("/physician/giveConsultation")
public class GiveConsultation extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
        try {
            String requestBody = RequestUtil.getBody(req);
            String disease = RequestUtil.getKeyFromJson(requestBody, "disease");
            String patientUsername = RequestUtil.getKeyFromJson(requestBody, "patientUsername");

            String jwtToken = JwtUtil.extractToken(req);

            String physicianEmail = JwtUtil.fromJwtTokenGet(jwtToken);
            Physician physician = PhysicianDB.findPhysician(physicianEmail);

            Consultation consultation = new Consultation(disease, physician);

            Patient patient = PatientDB.findPatient(patientUsername);

            if (physician == null) {
                ResFormat.res(res, new ResponseEntity<>("401 Unauthorized", null), HttpServletResponse.SC_UNAUTHORIZED);
                return;
            }

            if (patient == null) {
                throw new IllegalArgumentException("Patient not found");
            }

            if (patient.getSelectedPhysician() != physician) {
                ResFormat.res(res,
                        new ResponseEntity<>("401 Unauthorized, Only a selected physician can give consultation", null),
                        HttpServletResponse.SC_UNAUTHORIZED);
                return;
            }

            Patient result = PatientDB.getConsultation(patientUsername, consultation);
            ResFormat.res(res, new ResponseEntity<Patient>("successfully given consultation to patient", result),
                    HttpServletResponse.SC_OK);

        } catch (Exception e) {
            e.printStackTrace();
            ResFormat.res(res, new ResponseEntity<>(e.getMessage(), null), HttpServletResponse.SC_FORBIDDEN);
        }
    }
}
