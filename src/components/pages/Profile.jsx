import React, { useState } from "react";
import { Auth } from "aws-amplify";
import { useFormik } from "formik";
import ProfileForm from "./ProfileForm";
import ChangePassword from "./ChangePassword";

function Profile({ user, signOut }) {
  const [updating, setUpdating] = useState(false);
  const [changing, setChanging] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const formik = useFormik({
    initialValues: {
      username: user.username,
      email: user.attributes.email,
      firstName: user.attributes.given_name,
      lastName: user.attributes.family_name,
      oldPassword: "",
      newPassword: "",
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

  async function changePassword(e) {
    e.preventDefault();
    setChanging(true);
    console.log(formik.values.oldPassword, formik.values.newPassword);
    try {
      // const data = await Auth.changePassword(
      //   user,
      //   formik.values.oldPassword,
      //   formik.values.newPassword,
      // );
      // console.log(data);
      setTimeout(() => {
        signOut();
      }, 5000);
      setChanging(false);
    } catch (err) {
      console.log(err);
      setChanging(false);
    }
  }
  return (
    <div className="md:grid md:grid-cols-2 mb-8">
      <div className="mt-8">
        <h2 className="mb-8">Edit Profile</h2>
        <ProfileForm formik={formik} updating={updating} />
      </div>
      <div className="mt-8">
        <h2 className="mb-8">Change Password</h2>
        <ChangePassword
          formik={formik}
          changePassword={changePassword}
          updating={changing}
        />
      </div>
    </div>
  );
}

export default Profile;
