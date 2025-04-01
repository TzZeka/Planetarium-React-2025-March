import React, { useState, useEffect } from "react";
import { createItem, getItems } from "../../utils/api";
import { useAuth } from "../../contexts/AuthContext";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router";
import "../../Styles/Create.css";
import { toastError, toastInfo, toastSuccess } from "../../utils/toastNotifications";

const Create = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [size, setSize] = useState("");
  const [type, setType] = useState("");
  const [distance, setDistance] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [existingPlanets, setExistingPlanets] = useState([]);

  useEffect(() => {
    const fetchPlanets = async () => {
      const data = await getItems("planets");
      setExistingPlanets(data.map((planet) => planet.name.toLowerCase()));
    };
    fetchPlanets();
  }, []);

  const handleImageUpload = async () => {
    if (!image) return null;

    const storage = getStorage();
    const storageRef = ref(storage, `planets/${image.name}`);
    await uploadBytes(storageRef, image);
    return await getDownloadURL(storageRef);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (existingPlanets.includes(name.toLowerCase())) {
      toastInfo("This planet already exists.");
      return;
    }

    try {
      const imageUrl = await handleImageUpload();
      const planetId = await createItem("planets", {
        name,
        size,
        type,
        distance,
        description,
        imageUrl,
        createdBy: user.uid,
      });
      toastSuccess(`Planet created successfully! ID: ${planetId}`);
      navigate("/planets"); // Пренасочване към страницата с каталога
    } catch (error) {
      toastError(`Error creating planet: ${error.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="create-form">
      <h2>Create a New Planet</h2>
      <label>Planet Name:</label>
      <input value={name} onChange={(e) => setName(e.target.value)} required />
      <label>Size:</label>
      <input value={size} onChange={(e) => setSize(e.target.value)} required />
      <label>Type:</label>
      <input value={type} onChange={(e) => setType(e.target.value)} required />
      <label>Distance from Sun (million km):</label>
      <input
        type="number"
        value={distance}
        onChange={(e) => setDistance(e.target.value)}
        required
      />
      <label>Description:</label>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <label>Planet Image:</label>  
      <input type="file" onChange={(e) => setImage(e.target.files[0])} required />
      <button className="create-btn" type="submit">Create Planet</button>
    </form>
  );
};

export default Create;
