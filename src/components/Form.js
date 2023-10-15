import { useState } from "react";

export default function Form({ 
  getMovieList,
  setSearchTermEntered,
  setResultPage 
}) {
  const [formData, setFormData] = useState({
    searchTerm: ""
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSearchTermEntered(formData.searchTerm)
    setResultPage(1)
    await getMovieList(formData.searchTerm);
  };

  return (
    <div>
      <h1 id="title">Search A Movie, Any Movie!</h1>
      <form className="form" onSubmit={handleSubmit}>
        <label>Search : </label>
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
