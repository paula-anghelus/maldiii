import { useState } from "react";

export default function AddInput({
  chestie,
  onAdd,
  lista,
  onDelete
}) {
  const [input, setInput] = useState("");

  function handleAdd() {
    const valoare = input.trim();

    if (!valoare) {
      return;
    }

    onAdd(valoare);
    setInput("");
  }

  return (
    <>
    <div className="add-input-container">
      <label htmlFor={chestie.toLowerCase()}>
        {chestie + ":"}
      </label>

      <input
        type="text"
        id={chestie.toLowerCase()}
        placeholder={chestie.toLowerCase()}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button onClick={handleAdd}>
        Adaugă
      </button>
    </div>

      <ul>
        {lista.map((element) => (
          <li key={element}>
            {element}

            <button onClick={() => onDelete(element)}>
              Șterge
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}