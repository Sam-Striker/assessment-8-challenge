package com.challenge.ehospital.user.servlets.pharmacist;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.challenge.ehospital.database.MedicineDB;
import com.challenge.ehospital.database.PharmacistDB;
import com.challenge.ehospital.user.models.Medicine;
import com.challenge.ehospital.user.models.Pharmacist;
import com.challenge.ehospital.utils.JwtUtil;
import com.challenge.ehospital.utils.ResFormat;
import com.challenge.ehospital.utils.ResponseEntity;


@WebServlet("/medicines")
public class MedicineList extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
        try {

            String jwtToken = JwtUtil.extractToken(req);

            String pharmacistPhone = JwtUtil.fromJwtTokenGet(jwtToken);
            Pharmacist pharmacist = PharmacistDB.findPharmacist(pharmacistPhone);

            if (pharmacist == null) {
                throw new IllegalArgumentException("Unauthorized");
            }

            Medicine[] meds = MedicineDB.getMedicines();

            ResFormat.res(res, new ResponseEntity<Medicine[]>("medicines retrieved successfully", meds),
                    HttpServletResponse.SC_OK);
        } catch (Exception e) {
            e.printStackTrace();
            ResFormat.res(res, new ResponseEntity<>(e.getMessage(), null), HttpServletResponse.SC_FORBIDDEN);
        }
    }
}
