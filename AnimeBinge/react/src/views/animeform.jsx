import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosClient from "../axios-client.js";
import { useStateContext } from "../contexts/contextprovider.jsx";

export default function AnimeForm() {
  // Navigation hook
  const navigate = useNavigate();

  // Get 'id' parameter from the URL
  const { id } = useParams();

  // State to manage form data
  const [parsedCategory, setParsedCategory] = useState({
    action: false,
    horror: false,
    comedy: false,
    romance: false,
  });

  const [anime, setAnime] = useState({
    id: '',
    name: '',
    description: '',
    category: JSON.stringify(parsedCategory),
    image: '',
    rating: ''
  });

  // State to manage errors and loading status
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);

  // Get setNotification function from context
  const { setNotification } = useStateContext();

  // Fetch anime data if 'id' exists
  useEffect(() => {
    if (id) {
      setLoading(true);
      axiosClient.get(`/animes/${id}`)
        .then(({ data }) => {
          setLoading(false);
          const categ = data.category;
          const tempParsedCategory = JSON.parse(categ);
          setParsedCategory(tempParsedCategory);
          setAnime(data);
        })
        .catch((error) => {
          setLoading(false);
          console.error("Error fetching anime:", error);
        });
    }
  }, [id]);

  // Handle checkbox change event
  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setParsedCategory(prevCategory => ({ ...prevCategory, [name]: checked }));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setErrors(null);
  
    const formData = new FormData();
    formData.append('name', anime.name);
    formData.append('rating', anime.rating);
    formData.append('category', JSON.stringify(parsedCategory));
    formData.append('description', anime.description);
    
    // Check if an image was provided before appending it to formData
    if (anime.image) {
      formData.append('image', anime.image);
    }
  
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
  
    // Determine whether to make a POST or PUT request
    const apiCall = anime.id ? 
      axiosClient.put(`/animes/${anime.id}`, formData, config) :
      axiosClient.post('/animes', formData, config);
  
    apiCall.then(() => {
      // Navigate to /discover upon successful POST or PUT request
      navigate('/discover');
  
      const message = anime.id ? 'Anime was successfully updated' : 'Anime was successfully created';
      setNotification(message);
    })
    .catch((err) => {
      const response = err.response;
      if (response && response.status === 422) {
        setErrors(response.data.errors);
        console.log(response);
      }
    });
  };

  return (
    <>
      {anime.id && <h1>Update Anime: {anime.name}</h1>}
      {!anime.id && <h1>New Anime</h1>}
      <div className="card animated fadeInDown">
        {loading && (
          <div className="text-center">
            Loading...
          </div>
        )}
        {!loading && (
          <form onSubmit={onSubmit} encType="multipart/form-data">
            <div>
                <input 
                    value={anime.name} 
                    onChange={events => setAnime(prevAnime => ({...prevAnime, name: events.target.value}))} 
                    placeholder="Name"
                />
                {errors && errors.name && <span className="error">{errors.name[0]}</span>}
            </div>
            <div>
                <input 
                    value={anime.rating} 
                    onChange={events => {
                        let value = parseFloat(events.target.value);
                        if (value > 5) {
                            value = 5;
                        } else if (value < 0) {
                            value = 0;
                        }
                        setAnime(prevAnime => ({...prevAnime, rating: value.toString()}))
                    }} 
                    placeholder="Rating"
                    type="number"
                    step="1"
                    max="5"
                    min="0"
                />
                {errors && errors.rating && <span className="error">{errors.rating[0]}</span>}
            </div>
            <div>
              <label>
                <input 
                  type="checkbox" 
                  name="action"
                  onChange={handleCheckboxChange}
                  checked={parsedCategory.action || false}
                />
                Action
              </label>
              <label>
                <input 
                  type="checkbox" 
                  name="horror"
                  onChange={handleCheckboxChange}
                  checked={parsedCategory.horror || false}
                />
                Horror
              </label>
              <label>
                <input 
                  type="checkbox" 
                  name="comedy"
                  onChange={handleCheckboxChange}
                  checked={parsedCategory.comedy || false}
                />
                Comedy
              </label>
              <label>
                <input 
                  type="checkbox" 
                  name="romance"
                  onChange={handleCheckboxChange}
                  checked={parsedCategory.romance || false}
                />
                Romance
              </label>
              {errors && errors.category && <span className="error">{errors.category[0]}</span>}
            </div>
            <div>
                <textarea 
                    value={anime.description} 
                    onChange={events => setAnime(prevAnime => ({...prevAnime, description: events.target.value}))} 
                    placeholder="Description"
                ></textarea>
                {errors && errors.description && <span className="error">{errors.description[0]}</span>}
            </div>
            <div>
                <input 
                    type="file" 
                    onChange={events => setAnime(prevAnime => ({...prevAnime, image: events.target.files[0]}))} 
                />
                {errors && errors.image && <span className="error">{errors.image[0]}</span>}
            </div>
            <button className="btn">Save</button>
            <Link to="/discover">
              <button>
                Back
              </button>
            </Link>
          </form>
        )}
      </div>
    </>
  )
}