import React from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import { axiosWithAuth } from '../utils/axiosWithAuth';


function Login(props) {
    const login = (credentials) => {
        // login to retrieve the JWT token
        // add the token to localstorage
        // route to /friends (whatever landing page)
        axiosWithAuth()
          .post('/api/auth/login', credentials)
          .then(res => {
            console.log(res);
            localStorage.setItem('token', res.data.token);
            props.history.push('/friends');
          })
          .catch(err => console.log(err.response));
      };

    // const emailTest = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    return (
        <div className="login">
          <div className="form-container">
            <h2>Login</h2>
                <Formik
                // initialValues={{ email: "", password: "" }}
                initialValues={{ username: "", password: "" }}
                validate={values => {
                    let errors = {};
                    if (values.username === "") {
                    errors.username = "Username is required";
                    } else if (values.username.length < 2) {
                    errors.username = "Username must be 2 characters at minimum";
                    }
                    // if (values.email === "") {
                    // errors.email = "Email is required";
                    // } else if (!emailTest.test(values.email)) {
                    // errors.email = "Invalid email address format";
                    // }
                    if (values.password === "") {
                    errors.password = "Password is required";
                    } else if (values.password.length < 3) {
                    errors.password = "Password must be 3 characters at minimum";
                    }
                    return errors;
                }}
                onSubmit={(values, actions) => {
                    alert("Form is validated! Submitting the form...");
                    console.log("credentials from object", { username: values.username, password: values.password });
                    login({ username: values.username, password: values.password });
                    actions.setSubmitting(false);
                }}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <Field type="text" name="username" placeholder="Username" />
                            <ErrorMessage
                                component="p"
                                name="username"
                                className="error"
                            />  
                            {/* {touched.username && errors.username && (
                                <p className="error">{errors.username}</p>
                            )} */}
                    
                            <Field type="password" name="password" placeholder="Password" />
                            {/* {touched.password && errors.password && (
                                <p className="error">{errors.password}</p>
                            )} */}
                            <ErrorMessage
                                component="p"
                                name="password"
                                className="error"
                            />  
                            <div className="button-container">
                                <button 
                                    type="submit" 
                                    className="primary-button"
                                    disabled={isSubmitting}>
                                {isSubmitting ? "Please wait..." : "Log In"}
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            {/* <div className="button-container">
              <span>Don't have an account?</span>
              <Link to="/signup">
                <button type="button" className="secondary-button" >Get Started</button>
              </Link>
            </div> */}
          </div>
        </div>
    )
}

export default Login;