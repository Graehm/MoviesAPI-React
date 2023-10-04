import { useState } from "react";

export default function Form({ getMovies }) {
  const [formData, setFormData] = useState({
    searchTerm: ""
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getMovies(formData.searchTerm);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label>Search a Series of Movies:</label>
      <input
        className="field"
        name="searchTerm"
        type="text"
        onChange={handleChange}
        value={formData.searchTerm}
      />
      <br />

      <input className="submit" type="submit" />
    </form>
  );
}
