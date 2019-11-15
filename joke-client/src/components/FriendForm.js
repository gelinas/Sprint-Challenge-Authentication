import React from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import { axiosWithAuth } from '../utils/axiosWithAuth';


function FriendForm(props) {
    const addFriend = ({ name, age, email }) => {
        let newUser = {
            id: props.friends.length + 1,
            name: name,
            age: age,
            email: email
        }
        axiosWithAuth()
          .post('/api/friends', newUser)
          .then(res => {
            props.setFriends(res.data);
          })
          .catch(err => console.log(err.response));
      };

    const emailTest = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    return (
        <div className="form-container">
            <h2>Add Friend</h2>
                <Formik
                initialValues={{ name: "", age: "", email: "" }}
                validate={values => {
                    let errors = {};
                    if (values.name === "") {
                    errors.name = "Name is required";
                    } else if (values.name.length < 2) {
                    errors.name = "Name must be 2 characters at minimum";
                    }
                    if (values.age === "") {
                    errors.age = "Age is required";
                    } 
                    if (values.email === "") {
                    errors.email = "Email is required";
                    } else if (!emailTest.test(values.email)) {
                    errors.email = "Invalid email address format";
                    }
                    return errors;
                }}
                onSubmit={(values, actions) => {
                    alert("Form is validated! Submitting the form...");
                    // console.log("new user from object", { name: values.name, age: values.age, email: values.email });
                    addFriend({ name: values.name, age: values.age, email: values.email });
                    actions.setSubmitting(false);
                }}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <Field type="text" name="name" placeholder="Name" />
                            <ErrorMessage
                                component="p"
                                name="name"
                                className="error"
                            />
                    
                            <Field type="text" name="age" placeholder="Age" />

                            <ErrorMessage
                                component="p"
                                name="age"
                                className="error"
                            />  
                    
                            <Field type="text" name="email" placeholder="Email" />

                            <ErrorMessage
                                component="p"
                                name="email"
                                className="error"
                            />  
                            <div className="button-container">
                                <button 
                                    type="submit" 
                                    className="primary-button"
                                    disabled={isSubmitting}>
                                {isSubmitting ? "Please wait..." : "Add Friend"}
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
    )
}

export default FriendForm;