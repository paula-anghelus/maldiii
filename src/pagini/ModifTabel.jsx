import { useState } from "react";

export default function RegulaInput({
  bacterii,
  probe,
  testari,
  carduri,
  onSave
}) {
  const [bacterie, setBacterie] = useState("");
  const [proba, setProba] = useState("");
  const [testare, setTestare] = useState("");
  const [card, setCard] = useState("");
 
  return (
    <>
      <select
        value={bacterie}
        onChange={(e) => setBacterie(e.target.value)}
      >
        <option value="">Selectează bacteria</option>

        {bacterii.map((bacterie) => (
          <option key={bacterie} value={bacterie}>
            {bacterie}
          </option>
        ))}
      </select>

      <select
        value={proba}
        onChange={(e) => setProba(e.target.value)}
      >
        <option value="">Selectează proba</option>

        {probe.map((proba) => (
          <option key={proba} value={proba}>
            {proba}
          </option>
        ))}
      </select>

      <select
        value={testare}
        onChange={(e) => setTestare(e.target.value)}
      >
        <option value="">Selectează testarea</option>

        {testari.map((testare) => (
          <option key={testare} value={testare}>
            {testare}
          </option>
        ))}
      </select>
      
      {testare === 'Vitek' && (
        <select value={card} onChange={(e) => setCard(e.target.value)}>

        <option value="">Selectează cardul</option>

        {carduri.map((card) => (
          <option key={card} value={card}>
            {card}
          </option>
        ))}
      </select>
      )  
      }

      <button  onClick={() => {
        onSave(bacterie, proba, testare, card);
        setBacterie("");
        setProba("");
        setTestare("");
        setCard("");
      }}>Salvează</button>
    </>
  );
}