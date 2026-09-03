import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


function Home({ tabel }) {
  const [selectedBacterium, setSelectedBacterium] = useState("");
  const [selectedSample, setSelectedSample] = useState("");
  const [rezultat, setRezultat] = useState("");
  const navigate = useNavigate();
  const [bacterii, setBacterii] = useState([]);
  const [probe, setProbe] = useState([]);

  useEffect(() => {
  fetch(`${import.meta.env.VITE_API_URL}/bacterii`)
    .then((response) => response.json())
    .then((data) =>
      setBacterii(data.sort((a, b) => a.localeCompare(b)))
    );

  fetch(`${import.meta.env.VITE_API_URL}/probe`)
    .then((response) => response.json())
    .then((data) =>
      setProbe(data.sort((a, b) => a.localeCompare(b)))
    );
}, []);

  function handleSearch(bacterieSelectata, probaSelectata) {
    let index = tabel.findIndex(
        (item) => item.bacterie === bacterieSelectata && item.proba === probaSelectata
    );
    
    let rezultat = "Nu există o regulă definită pentru combinația selectată.";
    
    if (index !== -1 && tabel[index].regula !== "") {
        rezultat = tabel[index].regula;
    }
    setRezultat(rezultat);
}


  return (
    <div className="home-container">
        <h1>Ce pun în lucru după Maldi?</h1>
      <select
        value={selectedBacterium}
        onChange={(e) => setSelectedBacterium(e.target.value)}
      >
        <option value="">Selectează bacteria</option>

        {bacterii.map((bacterie) => (
          <option key={bacterie} value={bacterie}>
            {bacterie}
          </option>
        ))}
      </select>

      <select
        value={selectedSample}
        onChange={(e) => setSelectedSample(e.target.value)}
      >
        <option value="">Selectează tipul de probă</option>

        {probe.map((proba) => (
          <option key={proba} value={proba}>
            {proba}
          </option>
        ))}
      </select>

      <button onClick={() => {
        handleSearch(selectedBacterium, selectedSample)
        setSelectedBacterium("");
        setSelectedSample("");
        }}>
        Caută
      </button>

      <p>{rezultat}</p>

      <button className="switch-btn" onClick={() => navigate("/admin")}>
        Modifică datele
      </button>
    </div>
  );
}

export default Home;
