import React from "react";
import { Auth } from "aws-amplify";
import { useFormik } from "formik";

function Profile({ user }) {
  const formik = useFormik({
    initialValues: {
      username: user.username,
      email: user.attributes.email,
    },
    onSubmit: async (values) => {
      try {
        const result = await Auth.updateUserAttributes(user, {
          username: formik.values.username,
          email: formik.values.email,
        });
        console.log(result);
      } catch (err) {
        console.log(err);
      }
    },
  });
  return (
    <div>
      Profile
      <button onClick={formik.handleSubmit}>Submit</button>
    </div>
  );
}

export default Profile;
