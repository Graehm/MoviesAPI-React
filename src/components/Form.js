import { useState } from "react";

export default function Form({ getMovieList }) {
  const [formData, setFormData] = useState({
    searchTerm: ""
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getMovieList(formData.searchTerm);
  };

  return (
    <div>
      <h1 id="title">Movie Search Index</h1>
      <form className="form" onSubmit={handleSubmit}>
        <label>Search a Movie:</label>
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
    </div>
  );
}
