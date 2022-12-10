import { useCallback, useEffect, useState } from 'react';
import { Virtuoso } from 'react-virtuoso';
import { apiKey } from './apiKey';

function App() {
  const [photos, setPhotos] = useState([])
  const [dogs, setDogs] = useState();

  const headers = {
    "Content-Type": "application/json",
    "api_key": apiKey
  };

  const BASE_URL = `https://petstore.swagger.io/v2/pet/findByStatus?status=available&count=10`;

  function dogsHandler() {
    fetch('https://dog.ceo/api/breeds/image/random')
        .then((response) => response.json())
        .then((data) => {
          setDogs(data);
        })
        .catch((err) => {
            console.log(err.message);
        });
}

  const getPhotos = useCallback(async () => {
    const response = await fetch(BASE_URL, { headers })
    const data = await response.json()
    setPhotos((prevState) => [...prevState, ...data])
  }, [setPhotos])

  useEffect(() => {
    getPhotos().catch(console.error)
  }, [getPhotos])


  useEffect(() => {
    dogsHandler();
  }, [])

  console.log(dogs);

  return (
    <div style={{ width: "100vw", height: "90vh", textAlign: "center" }}>
      <h1>React Inifinite Scroll</h1>
      <Virtuoso
        data={photos}
        endReached={getPhotos}
        overscan={200}
        itemContent={(index, photo) => {
          return (
            <div className="d-flex justify-content-center">
              <div className="col-sm-5 my-4 " >
                <div className="card shadow-sm w-100" style={{ minHeight: 225 }}>
                <img src={dogs.message} alt="" />
                  <div className="card-body">
                    <h5 className="card-title text-end h5">Id : {photo.id}</h5>
                    <h6 className="card-subtitle mb-2 text-muted text-end">Name: {photo.name}</h6>
                    <p className="card-text text-end">Status : {photo.status}</p>
                  </div>
                </div>
              </div>
            </div>
          )
        }}
      />
    </div>
  );
}

export default App;