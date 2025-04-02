import React, { useState } from "react";
import "../Styles/ProfileDetailsModal.css";
import { updateProfile, updateEmail, updatePassword } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const ProfileDetailsModal = ({ user, closeModal }) => {
  const [newUsername, setNewUsername] = useState(user?.displayName || "");
  const [newEmail, setNewEmail] = useState(user?.email || "");
  const [newPassword, setNewPassword] = useState("");
  const [profileImage, setProfileImage] = useState(user?.photoURL || "/images/default-profile.png");
  const [imageFile, setImageFile] = useState(null);

  const handleSave = async () => {
    try {
      let photoURL = profileImage;

      if (imageFile) {
        const storage = getStorage();
        const imageRef = ref(storage, `profile-pictures/${user.uid}-${Date.now()}`);
        await uploadBytes(imageRef, imageFile);
        photoURL = await getDownloadURL(imageRef);
      }

      await updateProfile(user, { displayName: newUsername, photoURL });

      if (newEmail && newEmail !== user.email) {
        await updateEmail(user, newEmail);
      }

      if (newPassword) {
        await updatePassword(user, newPassword);
      }

      alert("Profile details updated successfully!");
      closeModal();
    } catch (error) {
      alert(`Failed to update profile: ${error.message}`);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
      setImageFile(file);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Edit Profile Details</h2>

        <label>
          Profile Picture:
          <input type="file" accept="image/*" onChange={handleImageUpload} />
        </label>
        <img src={profileImage} alt="Profile" className="profile-preview" />

        <label>
          New Username:
          <input
            type="text"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
          />
        </label>

        <label>
          New Email:
          <input
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />
        </label>

        <label>
          New Password:
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </label>

        <div className="modal-actions">
          <button onClick={handleSave} className="save-button">
            Save Changes
          </button>
          <button onClick={closeModal} className="cancel-button">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetailsModal;
