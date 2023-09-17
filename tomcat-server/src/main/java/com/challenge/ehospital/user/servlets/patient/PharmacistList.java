package com.challenge.ehospital.user.servlets.patient;

import java.io.IOException;
import java.util.Arrays;
import java.util.Comparator;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.challenge.ehospital.database.PharmacistDB;
import com.challenge.ehospital.user.models.Pharmacist;
import com.challenge.ehospital.user.models.User;
import com.challenge.ehospital.utils.ResFormat;
import com.challenge.ehospital.utils.ResponseEntity;

@WebServlet("/pharmacists")
public class PharmacistList extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
        try {
            Pharmacist[] pharmacists = PharmacistDB.getPharmacists();

            // sort age - descending
            Arrays.sort(pharmacists, new Comparator<User>() {
                @Override
                public int compare(User pharmacist1, User pharmacist2) {
                    return Integer.compare(pharmacist2.getAge(), pharmacist1.getAge());
                }
            });

            ResFormat.res(res, new ResponseEntity<User[]>("pharmacists retrieved successfully", pharmacists),
                    HttpServletResponse.SC_OK);
        } catch (Exception e) {
            e.printStackTrace();
            ResFormat.res(res, new ResponseEntity<>(e.getMessage(), null), HttpServletResponse.SC_FORBIDDEN);
        }
    }
}
