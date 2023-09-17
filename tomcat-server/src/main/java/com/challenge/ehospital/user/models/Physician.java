package com.challenge.ehospital.user.models;

import javax.naming.AuthenticationException;

import com.challenge.ehospital.database.PhysicianDB;
import com.challenge.ehospital.user.dtos.Gender;
import com.challenge.ehospital.user.dtos.UserRoles;
import com.challenge.ehospital.utils.JwtUtil;
import com.challenge.ehospital.utils.PasswordUtil;
import com.challenge.ehospital.utils.ResponseEntity;

public class Physician extends User {
    
    private String email;

    public Physician(String fullNames, String email, String password, String id, Integer age, Gender gender,
            UserRoles role) {
        super(id, fullNames, gender, age, role, password);
        this.email = email;
    }

    @Override
    public ResponseEntity<User> register() throws Exception {

        if (!PasswordUtil.isValidPassword(getPassword(), 7, 8)) {
            throw new Exception("Physician's password must be 7-8 characters");
        }

        PhysicianDB.addPhysician(this);
        return new ResponseEntity<User>("Physician registered successfully!", PhysicianDB.findPhysician(getEmail()));
    }

    @Override
    public ResponseEntity<String> login(String email, String Password) throws AuthenticationException {
        Physician existingUser = PhysicianDB.findPhysician(email);

        if (existingUser == null)
            throw new AuthenticationException("Physician does not exist!");

        if (!Password.equals(existingUser.getPassword()))
            throw new AuthenticationException("Incorrect email or password!");

        String jwtToken = JwtUtil.signJwtToken(existingUser.email, existingUser.role);

        return new ResponseEntity<String>("Logged in Successfully!", jwtToken);
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
    
}
