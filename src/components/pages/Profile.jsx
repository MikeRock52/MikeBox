import React, { useState} from "react";
import { Auth } from "aws-amplify";
import { useFormik } from "formik";
import ProfileForm from "./ProfileForm";

function Profile({ user }) {
  const [ updating, setUpdating ] = useState(false);
  const formik = useFormik({
    initialValues: {
      username: user.username,
      email: user.attributes.email,
      firstName: user.attributes.given_name,
      lastName: user.attributes.family_name,
    },
    onSubmit: async (values) => {
      setUpdating(true);
      console.log(values);
      try {
        const result = await Auth.updateUserAttributes(user, {
          given_name: values.firstName,
          family_name: values.lastName,
        });
        user.given_name = values.firstName;
        user.family_name = values.lastName;
        console.log(result);
        setUpdating(false);
      } catch (err) {
        console.log(err);
        setUpdating(false);
      }
    },
  });
  return (
    <div className="mt-8">
      <h2 className="mb-8">Edit Profile</h2>
      <ProfileForm formik={formik} updating={updating} />
    </div>
  );
}

export default Profile;
