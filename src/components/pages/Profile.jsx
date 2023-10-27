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
    <div className="mt-8">
      <h2 className="mb-8">Edit Profile</h2>
      <ProfileForm formik={formik} updating={updating} />
    </div>
  );
}

export default Profile;
