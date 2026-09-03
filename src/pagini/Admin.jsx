import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import AddInput from "./AddInput";
import { carduri } from "../data/reguli";
import ModifTabel from "./ModifTabel";

function Admin({ setTabel }) {
  const navigate = useNavigate();
  const [bacterii, setBacterii] = useState([]);
  const [probe, setProbe] = useState([]);
  const [reguliList, setReguliList] = useState([]);
  const [sectiune, setSectiune] = useState("");

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

    fetch(`${import.meta.env.VITE_API_URL}/testari`)
      .then((response) => response.json())
      .then((data) =>
        setReguliList(data.sort((a, b) => a.localeCompare(b)))
      );
  }, []);

  async function addBacterie(bacterieNoua) {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/bacterii`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          bacterie: bacterieNoua
        })
      }
    );

    const data = await response.json();

    setBacterii(
      data.sort((a, b) => a.localeCompare(b))
    );
  }

  async function addProba(probaNoua) {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/probe`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          proba: probaNoua
        })
      }
    );

    const data = await response.json();

    setProbe(
      data.sort((a, b) => a.localeCompare(b))
    );
  }

  async function addRegula(testareNoua) {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/testari`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          testare: testareNoua
        })
      }
    );

    const data = await response.json();

    setReguliList(
      data.sort((a, b) => a.localeCompare(b))
    );
  }

  async function deleteBacterie(bacterieDeSters) {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/bacterii/${encodeURIComponent(
        bacterieDeSters
      )}`,
      {
        method: "DELETE"
      }
    );

    const data = await response.json();

    setBacterii(
      data.sort((a, b) => a.localeCompare(b))
    );
  }

  async function deleteProba(probaDeSters) {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/probe/${encodeURIComponent(
        probaDeSters
      )}`,
      {
        method: "DELETE"
      }
    );

    const data = await response.json();

    setProbe(
      data.sort((a, b) => a.localeCompare(b))
    );
  }

  async function deleteRegula(regulaDeSters) {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/testari/${encodeURIComponent(
        regulaDeSters
      )}`,
      {
        method: "DELETE"
      }
    );

    const data = await response.json();

    setReguliList(
      data.sort((a, b) => a.localeCompare(b))
    );
  }

  async function modificaRegula(
    bacterieSelectata,
    probaSelectata,
    testareSelectata,
    cardSelectat
  ) {
    if (
      !bacterieSelectata ||
      !probaSelectata ||
      !testareSelectata ||
      (testareSelectata === "Vitek" && !cardSelectat)
    ) {
      alert("Toate câmpurile sunt obligatorii!");
      return;
    }

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/reguli`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          bacterie: bacterieSelectata,
          proba: probaSelectata,
          testare: testareSelectata,
          card: cardSelectat
        })
      }
    );

    const regulaModificata = await response.json();

    setTabel((tabelActual) =>
      tabelActual.map((rand) => {
        if (
          rand.bacterie === regulaModificata.bacterie &&
          rand.proba === regulaModificata.proba
        ) {
          return regulaModificata;
        }

        return rand;
      })
    );
  }

  return (
    <div className="admin-container">
      <h1>Modifică datele</h1>

      <div className="admin-buttons">
        <button onClick={() => setSectiune("bacterii")}>
          Modifică lista de bacterii
        </button>

        <button onClick={() => setSectiune("probe")}>
          Modifică lista de probe
        </button>

        <button onClick={() => setSectiune("testari")}>
          Modifică lista de testări
        </button>

        <button onClick={() => setSectiune("reguli")}>
          Modifică regulile
        </button>
      </div>

      {sectiune === "bacterii" && (
        <AddInput
          chestie="Bacterie"
          onAdd={addBacterie}
          lista={bacterii}
          onDelete={deleteBacterie}
        />
      )}

      {sectiune === "probe" && (
        <AddInput
          chestie="Probă"
          onAdd={addProba}
          lista={probe}
          onDelete={deleteProba}
        />
      )}

      {sectiune === "testari" && (
        <AddInput
          chestie="Testare"
          onAdd={addRegula}
          lista={reguliList}
          onDelete={deleteRegula}
        />
      )}

      {sectiune === "reguli" && (
        <ModifTabel
          bacterii={bacterii}
          probe={probe}
          testari={reguliList}
          carduri={carduri}
          onSave={modificaRegula}
        />
      )}

      <button
        className="switch-btn"
        onClick={() => navigate("/")}
      >
        Înapoi
      </button>
    </div>
  );
}

export default Admin;