import { useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import "./Publish.css";

const Publish = ({ userToken }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [condition, setCondition] = useState("");
  const [place, setPlace] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");

  const [photo, setPhoto] = useState();

  const navigate = useNavigate();

  const handleSubmit = async () => {
    event.preventDefault();
    console.log("Mon token est :", userToken);
    console.log("Photo envoyée :", photo);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("condition", condition);
      formData.append("city", place);
      formData.append("brand", brand);
      formData.append("size", size);
      formData.append("color", color);
      formData.append("picture", photo);

      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
        formData,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        },
      );
      console.log(response);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return userToken ? (
    <div className="publish-wrapper">
      <div className="container">
        <h1> Vends ton article</h1>
        <form onSubmit={handleSubmit}>
          {" "}
          <section className="publish-section">
            <div className="file-container">
              <label htmlFor="file"> + Ajoute une photo</label>
              <input
                id="file"
                type="file"
                onChange={(event) => {
                  setPhoto(event.target.files[0]);
                }}
              />
              {photo && <img src={URL.createObjectURL(photo)} alt="preview" />}
            </div>
          </section>
          <section className="publish-section">
            <div className="input-block">
              <label htmlFor="title">Titre</label>
              <input
                id="title"
                type="text"
                placeholder="ex: Jean slim "
                value={title}
                onChange={(event) => {
                  setTitle(event.target.value);
                }}
              />
            </div>
            <div className="input-block">
              <label htmlFor="description">Décris ton article</label>
              <textarea
                id="description"
                type="text"
                placeholder="ex: porté trés peu, usure normal"
                maxLength={500}
                value={description}
                onChange={(event) => {
                  setDescription(event.target.value);
                }}
              />
            </div>
          </section>
          <section className="publish-section">
            <div className="input-block">
              <label htmlFor="brand">Marque</label>
              <input
                id="brand"
                type="text"
                placeholder="ex: Nike"
                value={brand}
                onChange={(event) => {
                  setBrand(event.target.value);
                }}
              />
            </div>
            <div className="input-block">
              <label htmlFor="size">Taille</label>
              <input
                id="size"
                type="text"
                placeholder="ex: L / 42 / 12 "
                value={size}
                onChange={(event) => {
                  setSize(event.target.value);
                }}
              />
            </div>
            <div className="input-block">
              <label htmlFor="color">Couleur</label>
              <input
                id="color"
                type="text"
                placeholder="ex: Beige"
                value={color}
                onChange={(event) => {
                  setColor(event.target.value);
                }}
              />
            </div>
            <div className="input-block">
              <label htmlFor="condition">Etat</label>
              <input
                id="condition"
                type="text"
                placeholder="ex: Neuf avec étiquette"
                value={condition}
                onChange={(event) => {
                  setCondition(event.target.value);
                }}
              />
            </div>
            <div className="input-block">
              <label htmlFor="place">Lieu</label>
              <input
                id="place"
                type="text"
                placeholder="ex: Paris"
                value={place}
                onChange={(event) => {
                  setPlace(event.target.value);
                }}
              />{" "}
            </div>{" "}
          </section>
          <section className="publish-section">
            <div className="input-block">
              <label htmlFor="price">Prix</label>
              <input
                id="price"
                type="number"
                value={price}
                onChange={(event) => {
                  setPrice(event.target.value);
                }}
              />
            </div>{" "}
          </section>
          <div className="submit-btn-box">
            <button type="submit" className="submit-btn">
              Ajouter
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : (
    <Navigate to="/signup" />
  );
};

export default Publish;
