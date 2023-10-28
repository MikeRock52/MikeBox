import React, { useState } from "react";
import { Auth } from "aws-amplify";
import { useFormik } from "formik";
import ProfileForm from "./ProfileForm";
import ChangePassword from "./ChangePassword";

function Profile({ user }) {
  const [updating, setUpdating] = useState(false);
  const formik = useFormik({
    initialValues: {
      username: user.username,
      email: user.attributes.email,
      firstName: user.attributes.given_name,
      lastName: user.attributes.family_name,
    },
    onSubmit: async (values) => {
      setUpdating(true);
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
    <div className="md:grid md:grid-cols-2 mb-8">
      <div className="mt-8">
        <h2 className="mb-8">Edit Profile</h2>
        <ProfileForm formik={formik} updating={updating} />
      </div>
      {/* <hr className="border-b-2 border-lime-50 w-96 mx-auto mt-8 text-center" /> */}
      <div className="mt-8">
        <h2 className="mb-8">Change Password</h2>
        <ChangePassword formik={formik} updating={updating}/>
      </div>
    </div>
  );
}

export default Profile;
