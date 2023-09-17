package com.challenge.ehospital.user.models;

import javax.naming.AuthenticationException;

import com.challenge.ehospital.database.PharmacistDB;
import com.challenge.ehospital.user.dtos.Gender;
import com.challenge.ehospital.user.dtos.UserRoles;
import com.challenge.ehospital.utils.JwtUtil;
import com.challenge.ehospital.utils.PasswordUtil;
import com.challenge.ehospital.utils.ResponseEntity;

public class Pharmacist extends User {
    
    private String phone;

    public Pharmacist(String id, String fullNames, Gender gender, Integer age, UserRoles role, String password) {
        super(id, fullNames, gender, age, role, password);
        // TODO Auto-generated constructor stub
    }

    @Override
    public ResponseEntity<User> register() throws Exception {
        if (!PasswordUtil.isValidPassword(getPassword(), 9, 10)) {
            throw new Exception("Pharmacist's password must be 9-10 characters");
        }

        PharmacistDB.addPharmacist(this);

        return new ResponseEntity<User>("Pharmacist registered successfully!",
                PharmacistDB.findPharmacist(getPhone()));
    }

    @Override
    public ResponseEntity<String> login(String phone, String Password) throws AuthenticationException {
        Pharmacist existingUser = PharmacistDB.findPharmacist(phone);

        if (existingUser == null)
            throw new AuthenticationException("Pharmacist does not exist!");

        if (!Password.equals(existingUser.getPassword()))
            throw new AuthenticationException("Incorrect phone number or password!");

        String jwtToken = JwtUtil.signJwtToken(existingUser.phone, existingUser.role);

        return new ResponseEntity<String>("Logged in Successfully!", jwtToken);
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }
    
}
