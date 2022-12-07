import { useCallback, useEffect, useState } from 'react';
import { Virtuoso } from 'react-virtuoso';
import { apiKey } from './apiKey';

function App() {
  const headers = {
    "Content-Type": "application/json",
    "api_key": apiKey
  }

  const BASE_URL = `https://petstore.swagger.io/v2/pet/findByStatus?status=available`

  const [photos, setPhotos] = useState([])

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
      <h1>React Inifinite Scroll Virtuoso</h1>
      <Virtuoso
        data={photos}
        endReached={getPhotos}
        overscan={200}
        itemContent={(index, photo) => {
          return <h1>{photo.id}</h1>
          // <img key={index} src={photo.urls.small} alt={`Photo ${index}`} />
        }}
      />
    </div>
  );
}

export default App;