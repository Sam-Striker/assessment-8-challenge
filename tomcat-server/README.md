# assessment-complete

### Assessment - 8 (Tomcat)

- All user authentication complete - with polymorphism

# How to test the app?

<!-- - Clone this repo in your local computer `https://github.com/samuelm/assessment-progres-auth-complete.git` -->
- Open the project in the terminal
- In the project directory run command `mvn tomcat7:run` in the terminal to start the app
- If it does not build run `mvn clean install` first.
- Access the api at `http://localhost:8080` and send requests using postman,...

## Auth Endpoints

- `/api/register`
  > For example registering a patient:
  > In the request body: `

> {
> "fullNames": "Jane",
> "username": "test",
> "gender": "Male",
> "age": 27,
> "role": "Patient",
> "password": "1234"
> }`

### NB: They are some fields which are unique To different users `Patient, Physician, Pharmacist` while registering or logging in!

- `/api/login`
  > For example registering a patient:
  > In the request body: `

> {
> "fullNames": "Jane",
> "username": "test",
> "gender": "Male",
> "age": 27,
> "role": "Patient",
> "password": "1234"
> }`
