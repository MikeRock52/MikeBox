import React, { useState } from "react";
import { Auth } from "aws-amplify";
import { useFormik } from "formik";
import ProfileForm from "./ProfileForm";
import ChangePassword from "./ChangePassword";
import toast from 'react-hot-toast';

function Profile({ user, signOut }) {
  const [updating, setUpdating] = useState(false);
  const [changing, setChanging] = useState(false);
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
        toast.success('Profile updated successfully!');
        setUpdating(false);
      } catch (err) {
        console.log(err);
        toast.error('Error updating your profile. Please try again...')
        setUpdating(false);
      }
    },
  });

  async function changePassword(e) {
    e.preventDefault();
    setChanging(true);
    console.log(formik.values.oldPassword, formik.values.newPassword);
    try {
      const data = await Auth.changePassword(
        user,
        formik.values.oldPassword,
        formik.values.newPassword,
      );
      console.log(data);
      toast.success('Your password was updated successfully. Please sign in with your new password');
      setTimeout(() => {
        signOut();
      }, 5010);
      setChanging(false);
    } catch (err) {
      console.log(err);
      toast.error('Error updating your password. Please enter correct value and try again.');
      setChanging(false);
    }
  }
  return (
    <div className="md:grid md:grid-cols-2 mb-8 mt-8">
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
