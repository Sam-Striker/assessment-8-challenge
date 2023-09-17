package com.challenge.ehospital.user.servlets.pharmacist;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.challenge.ehospital.database.MedicineDB;
import com.challenge.ehospital.database.PatientDB;
import com.challenge.ehospital.database.PharmacistDB;
import com.challenge.ehospital.user.models.Medicine;
import com.challenge.ehospital.user.models.Patient;
import com.challenge.ehospital.user.models.Pharmacist;
import com.challenge.ehospital.user.models.Prescription;
import com.challenge.ehospital.utils.JwtUtil;
import com.challenge.ehospital.utils.RequestUtil;
import com.challenge.ehospital.utils.ResFormat;
import com.challenge.ehospital.utils.ResponseEntity;

@WebServlet("/pharmacist/givePrescription")
public class GivePrescription extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
        try {
            String requestBody = RequestUtil.getBody(req);
            String patientUsername = RequestUtil.getKeyFromJson(requestBody, "patientUsername");
            String disease = RequestUtil.getKeyFromJson(requestBody, "disease");
            String medicineName = RequestUtil.getKeyFromJson(requestBody, "medicineName");

            String jwtToken = JwtUtil.extractToken(req);

            String pharmacistPhone = JwtUtil.fromJwtTokenGet(jwtToken);
            Pharmacist pharmacist = PharmacistDB.findPharmacist(pharmacistPhone);
            Patient patient = PatientDB.findPatient(patientUsername);
            Medicine medicine = MedicineDB.findMedicine(medicineName);

            if (pharmacist == null) {
                ResFormat.res(res, new ResponseEntity<>("401 Unauthorized", null), HttpServletResponse.SC_UNAUTHORIZED);
                return;
            }

            if (patient == null) {
                throw new IllegalArgumentException("Patient not found");
            }

            if (patient.getSelectedPharmacist() != pharmacist) {
                ResFormat.res(res,
                        new ResponseEntity<>("401 Unauthorized, Only a selected pharmacist can give prescription",
                                null),
                        HttpServletResponse.SC_UNAUTHORIZED);
                return;
            }

            if (patient.getConsultation() == null) {
                throw new IllegalArgumentException("Patient does not have consultation");
            }

            if (medicine == null) {
                throw new IllegalArgumentException("Medicine not found in the list of available medecines");
            }

            Prescription prescription = new Prescription(disease, medicine);

            Patient result = PatientDB.getPrescription(patientUsername, prescription);
            ResFormat.res(res, new ResponseEntity<Patient>("successfully given prescription to the patient", result),
                    HttpServletResponse.SC_OK);

        } catch (Exception e) {
            e.printStackTrace();
            ResFormat.res(res, new ResponseEntity<>(e.getMessage(), null), HttpServletResponse.SC_FORBIDDEN);
        }
    }
}
