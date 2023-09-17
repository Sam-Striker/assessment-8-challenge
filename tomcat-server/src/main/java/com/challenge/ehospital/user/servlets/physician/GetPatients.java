package com.challenge.ehospital.user.servlets.physician;

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
import com.challenge.ehospital.user.models.User;
import com.challenge.ehospital.utils.JwtUtil;
import com.challenge.ehospital.utils.ResFormat;
import com.challenge.ehospital.utils.ResponseEntity;

@WebServlet("/physician/getPatients")
public class GetPatients extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
        try {

            String jwtToken = JwtUtil.extractToken(req);

            String physicianEmail = JwtUtil.fromJwtTokenGet(jwtToken);
            Physician physician = PhysicianDB.findPhysician(physicianEmail);

            if (physician == null) {
                ResFormat.res(res, new ResponseEntity<>("401 Unauthorized", null), HttpServletResponse.SC_UNAUTHORIZED);
                return;
            }

            Patient[] patients = PatientDB.getPhysicianPatients(physician.getEmail());

            ResFormat.res(res, new ResponseEntity<User[]>("your patients retrieved successfully", patients),
                    HttpServletResponse.SC_OK);
        } catch (Exception e) {
            e.printStackTrace();
            ResFormat.res(res, new ResponseEntity<>(e.getMessage(), null), HttpServletResponse.SC_FORBIDDEN);
        }
    }
}
