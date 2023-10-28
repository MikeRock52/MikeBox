import React from "react";

function ChangePassword({ formik, updating }) {
  return (
    <form
      action="#"
      onSubmit={formik.handleSubmit}
      method="POST"
      className="text-left px-8 sm:px-12"
    >
      <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:w-3/4 md:w-3/4 mx-auto">
        <div className="">
          <label
            htmlFor="oldPassword"
            className="block text-sm font-semibold leading-6 text-lime-900"
          >
            Old Password
          </label>
          <div className="mt-2.5 bg-lime-100">
            <input
              type="password"
              name="oldPassword"
              value={formik.values.oldPassword}
              onChange={formik.handleChange}
              placeholder="Enter your old password"
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-gray-400 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div className="">
          <label
            htmlFor="newPassword"
            className="block text-sm font-semibold leading-6 text-lime-900"
          >
            New Password
          </label>
          <div className="mt-2.5 bg-lime-100">
            <input
              type="password"
              name="newPassword"
              value={formik.values.newPassword}
              placeholder="Enter your new password"
              onChange={formik.handleChange}
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-gray-400 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div className="mt-2">
          <button
            type="submit"
            className="block w-full rounded-md bg-lime-900 text-lime-200 px-3.5 py-2.5 text-center text-sm font-semibold shadow-sm hover:bg-lime-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-800"
            disabled={updating}
          >
            {updating ? "Updating your password..." : "Update Password"}
          </button>
        </div>
      </div>
    </form>
  );
}

export default ChangePassword;
