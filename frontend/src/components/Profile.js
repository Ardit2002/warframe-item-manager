import React from 'react';

const Profile = ({ user }) => {
  return (
    <div className="profile-container">
      <h2 className="text-2xl font-semibold">User Profile</h2>
      <div className="mt-4">
        <p><strong>Email:</strong> {user.email}</p>
        <button className="bg-red-500 text-white px-4 py-2 mt-4">Edit Profile</button>
      </div>
    </div>
  );
};

export default Profile;
