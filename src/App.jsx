import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pagini/Home";
import Admin from "./pagini/Admin";


function App() {
  const [tabel, setTabel] = useState([]);

  useEffect(() => {
  fetch("http://localhost:3000/reguli")
    .then((response) => response.json())
    .then((data) => setTabel(data));
}, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Home tabel={tabel} />}
        />

        <Route
          path="/admin"
          element={
            <Admin
              tabel={tabel}
              setTabel={setTabel}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;