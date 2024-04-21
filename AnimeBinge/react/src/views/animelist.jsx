import { useEffect, useState } from "react";
import axiosClient from "../axios-client.js";
import { Link } from "react-router-dom";

export default function AnimeList() {
  const [anime, setAnimes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAnime();
  }, [])

  const getAnime = () => {
    setLoading(true)
    axiosClient.get('/animes')
      .then(({ data }) => {
        setLoading(false)
        setAnimes(data.data)
      })
      .catch(() => {
        setLoading(false)
      })
  }

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
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}