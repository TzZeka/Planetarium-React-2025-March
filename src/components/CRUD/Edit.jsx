import React, { useState } from "react";
import { updateItem } from "../../utils/api";
import { toastError, toastSuccess } from './../../utils/toastNotifications';

const Edit = ({ planet, onClose }) => {
  const [name, setName] = useState(planet.name);
  const [size, setSize] = useState(planet.size);
  const [color, setColor] = useState(planet.color);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateItem("planets", planet.id, { name, size, color });
      toastSuccess("Planet updated successfully.");
      onClose();
    } catch (error) {
      toastError("Error updating planet:", error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Planet Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <label>
        Size:
        <input
          type="text"
          value={size}
          onChange={(e) => setSize(e.target.value)}
          required
        />
      </label>
      <label>
        Color:
        <input
          type="text"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          required
        />
      </label>
      <button type="submit">Save Changes</button>
    </form>
  );
};

export default Edit;
