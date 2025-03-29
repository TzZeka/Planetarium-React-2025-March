import React, { useState } from "react";
import "../Styles/ProfileDetailsModal.css";
import { updateProfile } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const ProfileDetailsModal = ({ user, setUser, closeModal }) => {
  const [newUsername, setNewUsername] = useState(user?.displayName || "");
  const [newPassword, setNewPassword] = useState("");
  const [profileImage, setProfileImage] = useState(user?.photoURL || "/images/default-profile.png");
  const [imageFile, setImageFile] = useState(null); // Съхраняване на файла за качване

  const handleSave = async () => {
    try {
      // Firebase Storage за профилна снимка
      let photoURL = profileImage; // Запазваме оригиналното URL, ако няма нова снимка
      if (imageFile) {
        const storage = getStorage();
        const imageRef = ref(storage, `profile-pictures/${user.uid}`); // Път за съхранение на снимката
        await uploadBytes(imageRef, imageFile);
        photoURL = await getDownloadURL(imageRef); // Получаване на URL към каченото изображение
      }

      // Обновяване на профилни данни в Firebase Authentication
      await updateProfile(user, { displayName: newUsername, photoURL });
      setUser((prev) => ({ ...prev, displayName: newUsername, photoURL }));

      if (newPassword) {
        await user.updatePassword(newPassword);
        alert("Password updated successfully!");
      }

      alert("Profile details updated successfully!");
      closeModal(); // Затваряне на модала
    } catch (error) {
      alert(`Failed to update profile: ${error.message}`);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file); // За локално визуализиране на каченото изображение
      setProfileImage(imageUrl);
      setImageFile(file); // Съхраняване на файла за качване
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Edit Profile Details</h2>

        {/* Качване на профилна снимка */}
        <label>
          Profile Picture:
          <input type="file" accept="image/*" onChange={handleImageUpload} />
        </label>
        <img src={profileImage} alt="Profile" className="profile-preview" />

        {/* Промяна на username */}
        <label>
          New Username:
          <input
            type="text"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
          />
        </label>

        {/* Промяна на парола */}
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
