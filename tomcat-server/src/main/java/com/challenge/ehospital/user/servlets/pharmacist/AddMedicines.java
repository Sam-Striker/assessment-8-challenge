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
import com.challenge.ehospital.utils.JSONUtil;
import com.challenge.ehospital.utils.JwtUtil;
import com.challenge.ehospital.utils.ResFormat;
import com.challenge.ehospital.utils.ResponseEntity;

@WebServlet("/pharmacist/addMedicine")
public class AddMedicines extends HttpServlet {
    private static final long serialVersionUID = 1L;

    protected void doPost(HttpServletRequest req, HttpServletResponse res)
            throws ServletException, IOException {
        try {
            String jwtToken = JwtUtil.extractToken(req);

            String pharmacistPhone = JwtUtil.fromJwtTokenGet(jwtToken);
            Pharmacist pharmacist = PharmacistDB.findPharmacist(pharmacistPhone);

            if (pharmacist == null) {
                throw new IllegalArgumentException("Unauthorized");
            }

            Medicine med = new JSONUtil().parseBodyJson(req, Medicine.class);
            ResponseEntity<Medicine> results = MedicineDB.addMedicine(med);
            ResFormat.res(res, results, HttpServletResponse.SC_OK);

        } catch (Exception e) {
            e.printStackTrace();
            ResFormat.res(res, new ResponseEntity<>(e.getMessage(), null), HttpServletResponse.SC_FORBIDDEN);
        }

    }
}
