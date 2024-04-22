import { useEffect, useState } from "react";
import axiosClient from "../axios-client.js";
import { Link } from "react-router-dom";

export default function AnimeList() {
  // State to hold the list of anime and loading status
  const [anime, setAnimes] = useState([]);
  const [loading, setLoading] = useState(false);

  // useEffect to fetch anime data when the component mounts
  useEffect(() => {
    getAnime();
  }, []);

  // Function to fetch anime data
  const getAnime = () => {
    setLoading(true); // Set loading to true before making the request
    axiosClient.get('/animes') // Make GET request to '/animes' endpoint
      .then(({ data }) => {
        setLoading(false); // Set loading to false after successful request
        setAnimes(data.data); // Update anime state with fetched data
      })
      .catch(() => {
        setLoading(false); // Set loading to false if there's an error
      });
  };

  // Function to handle delete action
  const onDeleteClick = (anime) => {
    // Confirm deletion with the user
    if (!window.confirm("Are you sure you want to delete this anime?")) {
      return; // If user cancels deletion, exit the function
    }
    
    // Make DELETE request to delete the anime
    axiosClient.delete(`/animes/${anime.id}`)
      .then(() => {
        getAnime(); // Fetch updated anime list after successful deletion
      });
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Discover Anime</h1>
        <Link className="btn-add" to="/discover/addanime">Add Anime</Link>
      </div>
      <div className="card animated fadeInDown">
        {loading && <div className="loading">Loading...</div>}
        {!loading && (
          <div className="card-container">
            {anime.map((item) => (
              <div key={item.id} className="card-item">
                <h2>{item.name}</h2>
                <p>Rating: {item.rating}</p>
                <p>Category: {item.category}</p>
                <p>Description: {item.description}</p>
                <p>Image: {item.image}</p>
                <Link to={`/discover/edit/${item.id}`}>
                  <button>Edit</button>
                </Link>
                <button className="btn-delete" onClick={e => onDeleteClick(item)}>Delete</button>
              </div>

            ))}
          </div>
        )}
      </div>
    </div>
  )
}