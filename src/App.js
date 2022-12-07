import { useCallback, useEffect, useState } from 'react';
import { Virtuoso } from 'react-virtuoso';
import { apiKey } from './apiKey';

function App() {
  const [photos, setPhotos] = useState([])

  const headers = {
    "Content-Type": "application/json",
    "api_key": apiKey
  }

  const BASE_URL = `https://petstore.swagger.io/v2/pet/findByStatus?status=available`


  const getPhotos = useCallback(async () => {
    const response = await fetch(BASE_URL, { headers })
    const data = await response.json()
    setPhotos((prevState) => [...prevState, ...data])
  }, [setPhotos])

  useEffect(() => {
    getPhotos().catch(console.error)
  }, [getPhotos])



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
              <div className="col-sm-5 my-3 " >
                <div className="card shadow-sm w-100" style={{ minHeight: 225 }}>
                <img src="https://i.guim.co.uk/img/media/fe1e34da640c5c56ed16f76ce6f994fa9343d09d/0_174_3408_2046/master/3408.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=0d3f33fb6aa6e0154b7713a00454c83d" alt="" />
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