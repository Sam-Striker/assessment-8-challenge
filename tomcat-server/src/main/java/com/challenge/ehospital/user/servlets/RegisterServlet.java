package com.challenge.ehospital.user.servlets;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.challenge.ehospital.user.models.Patient;
import com.challenge.ehospital.user.models.Pharmacist;
import com.challenge.ehospital.user.models.Physician;
import com.challenge.ehospital.user.models.User;
import com.challenge.ehospital.utils.JSONUtil;
import com.challenge.ehospital.utils.RequestUtil;
import com.challenge.ehospital.utils.ResFormat;
import com.challenge.ehospital.utils.ResponseEntity;

@WebServlet("/register")
public class RegisterServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
        try {
            String requestBody = RequestUtil.getBody(req);
            String role = RequestUtil.getKeyFromJson(requestBody, "role");
            User user = null;

            switch (role) {
                case "Patient":
                    user = new JSONUtil().fromJson(requestBody, Patient.class);
                    break;
                case "Physician":
                    user = new JSONUtil().fromJson(requestBody, Physician.class);

                    break;
                case "Pharmacist":
                    user = new JSONUtil().fromJson(requestBody, Pharmacist.class);

                    break;
                default:
                    throw new IllegalArgumentException("Invalid user role: " + role);
            }

            ResponseEntity<User> results = user.register();
            ResFormat.res(res, results, HttpServletResponse.SC_CREATED);

        } catch (Exception e) {
            e.printStackTrace();
            ResFormat.res(res, new ResponseEntity<>(e.getMessage(), null), HttpServletResponse.SC_BAD_REQUEST);
        }
    }
}
