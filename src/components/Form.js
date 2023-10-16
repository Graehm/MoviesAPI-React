import { useState } from "react";

export default function Form({
  getMovieList,
  searchTermEntered,
  setSearchTermEntered,
  resultsPage,
  setResultsPage
}) {
  // state to hold form data
  const [formData, setFormData] = useState({
    searchTerm: ""
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    // prevent from reloading the page when form is submitted (need with every from in React)
    e.preventDefault();
    setSearchTermEntered(formData.searchTerm);
    setResultsPage(1);
    await getMovieList(formData.searchTerm);
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>Search :</label>
      <input
        id="inputField"
        name="searchTerm"
        type="text"
        onChange={handleChange}
        value={formData.searchTerm}
      />
      <input type="submit" />
    </form>
  );
}
