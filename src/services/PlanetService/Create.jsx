import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../contexts/AuthContext";
import { createItem, getItems } from "../../utils/api";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { toastError, toastSuccess } from "../../utils/toastNotifications";
import "../../styles/Create.css";
import { useFormik } from "formik";
import * as Yup from "yup";

const Create = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [existingPlanets, setExistingPlanets] = React.useState([]);

  useEffect(() => {
    const fetchPlanets = async () => {
      const data = await getItems("planets");
      setExistingPlanets(data.map((planet) => planet.name.toLowerCase()));
    };
    fetchPlanets();
  }, []);

  // Генериране на уникално име за файла, за да избегнем конфликти в Storage
  const handleImageUpload = async (image) => {
    const storage = getStorage();
    if (!image) return null;
    const uniqueName = `${Date.now()}-${image.name}`;
    const storageRef = ref(storage, `planets/${uniqueName}`);
    await uploadBytes(storageRef, image);
    return await getDownloadURL(storageRef);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      size: "",
      type: "",
      distance: "",
      description: "",
      image: null,
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Planet name is required")
        .notOneOf(existingPlanets, "This planet already exists"),
      size: Yup.string().required("Size is required"),
      type: Yup.string().required("Type is required"),
      distance: Yup.number()
        .required("Distance is required")
        .min(0, "Distance must be a positive number"),
      description: Yup.string().required("Description is required"),
      // За полето "image" няма задължителна валидация
      image: Yup.mixed(),
    }),
    onSubmit: async (values) => {
      try {
        // Ако снимката не е избрана, imageUrl ще бъде null
        const imageUrl = await handleImageUpload(values.image);
        const planetId = await createItem("planets", {
          name: values.name,
          size: values.size,
          type: values.type,
          distance: values.distance,
          description: values.description,
          imageUrl,
          createdBy: user.uid,
        });
        toastSuccess(`Planet created successfully! ID: ${planetId}`);
        navigate("/planets");
      } catch (error) {
        toastError(`Error creating planet: ${error.message}`);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="create-form">
      <h2>Create a New Planet</h2>

      <label>
        Planet Name:
        <p className="special-label">Required</p>
      </label>
      <input
        name="name"
        value={formik.values.name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {formik.touched.name && formik.errors.name && (
        <p className="error-message">{formik.errors.name}</p>
      )}

      <label>
        Size:
        <p className="special-label">Required</p>
      </label>
      <input
        name="size"
        value={formik.values.size}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {formik.touched.size && formik.errors.size && (
        <p className="error-message">{formik.errors.size}</p>
      )}

      <label>
        Type:
        <p className="special-label">Required</p>
      </label>
      <input
        name="type"
        value={formik.values.type}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {formik.touched.type && formik.errors.type && (
        <p className="error-message">{formik.errors.type}</p>
      )}

      <label>
        Distance from Sun (million km):
        <p className="special-label">Required</p>
      </label>
      <input
        type="number"
        name="distance"
        value={formik.values.distance}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {formik.touched.distance && formik.errors.distance && (
        <p className="error-message">{formik.errors.distance}</p>
      )}

      <label>Description:</label>
      <textarea
        name="description"
        value={formik.values.description}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {formik.touched.description && formik.errors.description && (
        <p className="error-message">{formik.errors.description}</p>
      )}

      <label>Planet Image:</label>
      <input
        type="file"
        name="image"
        onChange={(event) =>
          formik.setFieldValue("image", event.currentTarget.files[0])
        }
        onBlur={formik.handleBlur}
      />
      {/* Тук не показваме грешка за снимката, защото вече няма required проверка */}

      <button className="create-btn" type="submit">
        Create Planet
      </button>
    </form>
  );
};

export default Create;
