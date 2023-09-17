package com.challenge.ehospital.user.models;

import javax.naming.AuthenticationException;

import com.challenge.ehospital.database.PatientDB;
import com.challenge.ehospital.user.dtos.Gender;
import com.challenge.ehospital.user.dtos.UserRoles;
import com.challenge.ehospital.utils.JwtUtil;
import com.challenge.ehospital.utils.PasswordUtil;
import com.challenge.ehospital.utils.ResponseEntity;

public class Patient extends User {
    private String username;
    private Physician selectedPhysician;
    private Pharmacist selectedPharmacist;
    private Consultation consultation;
    private Prescription prescription;

    public Patient(String id, String fullNames, Gender gender, Integer age, UserRoles role, String password) {
        super(id, fullNames, gender, age, role, password);
    }

    @Override
    public ResponseEntity<User> register() throws Exception {

        if (!PasswordUtil.isValidPassword(getPassword(), 4, 6)) {
            throw new Exception("Patient's password must be 4-6 characters");
        }

        PatientDB.addPatient(this);
        return new ResponseEntity<User>("Patient registered successfully!", PatientDB.findPatient(getUsername()));
    }

    @Override
    public ResponseEntity<String> login(String username, String Password) throws AuthenticationException {
        Patient existingUser = PatientDB.findPatient(username);

        if (existingUser == null)
            throw new AuthenticationException("Patient does not exist!");

        if (!Password.equals(existingUser.getPassword()))
            throw new AuthenticationException("Incorrect username or password!");

        String jwtToken = JwtUtil.signJwtToken(existingUser.username, existingUser.role);

        return new ResponseEntity<String>("Logged in Successfully!", jwtToken);
    }

    public String getUsername() {
      return username;
    }

    public void setUsername(String username) {
      this.username = username;
    }

    public Physician getSelectedPhysician() {
      return selectedPhysician;
    }

    public void setSelectedPhysician(Physician selectedPhysician) {
      this.selectedPhysician = selectedPhysician;
    }

    public Pharmacist getSelectedPharmacist() {
      return selectedPharmacist;
    }

    public void setSelectedPharmacist(Pharmacist selectedPharmacist) {
      this.selectedPharmacist = selectedPharmacist;
    }

    public Consultation getConsultation() {
      return consultation;
    }

    public void setConsultation(Consultation consultation) {
      this.consultation = consultation;
    }

    public Prescription getPrescription() {
      return prescription;
    }

    public void setPrescription(Prescription prescription) {
      this.prescription = prescription;
    }
    
}
