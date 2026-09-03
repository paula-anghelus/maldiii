import express from "express";
import cors from "cors";
import db from "./database.js";

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());

// ====================
// BACTERII - GET
// ====================

app.get("/bacterii", async (req, res) => {
  const rezultat = await db.query(
    "SELECT nume FROM bacterii ORDER BY nume"
  );

  const bacterii = rezultat.rows.map((rand) => rand.nume);

  res.json(bacterii);
});


// ====================
// BACTERII - POST
// ====================

app.post("/bacterii", async (req, res) => {
  const bacterieNoua = req.body.bacterie;

  await db.query(
    `
    INSERT INTO bacterii (nume)
    VALUES ($1)
    `,
    [bacterieNoua]
  );

  const toateProbele = await db.query(
    "SELECT nume FROM probe"
  );

  for (const proba of toateProbele.rows) {
    await db.query(
      `
      INSERT INTO reguli (bacterie, proba, regula)
      VALUES ($1, $2, '')
      ON CONFLICT (bacterie, proba) DO NOTHING
      `,
      [bacterieNoua, proba.nume]
    );
  }

  const rezultat = await db.query(
    "SELECT nume FROM bacterii ORDER BY nume"
  );

  const bacterii = rezultat.rows.map((rand) => rand.nume);

  res.json(bacterii);
});


// ====================
// BACTERII - DELETE
// ====================

app.delete("/bacterii/:nume", async (req, res) => {
  const nume = req.params.nume;

  const rezultat = await db.query(
    "DELETE FROM bacterii WHERE nume = $1",
    [nume]
  );

  if (rezultat.rowCount === 0) {
    return res.status(404).json({
      mesaj: "Bacteria nu există"
    });
  }

  await db.query(
    `
    DELETE FROM reguli
    WHERE bacterie = $1
    `,
    [nume]
  );

  const toateBacteriile = await db.query(
    "SELECT nume FROM bacterii ORDER BY nume"
  );

  const bacterii = toateBacteriile.rows.map((rand) => rand.nume);

  res.json(bacterii);
});


// ====================
// PROBE - GET
// ====================

app.get("/probe", async (req, res) => {
  const rezultat = await db.query(
    "SELECT nume FROM probe ORDER BY nume"
  );

  const probe = rezultat.rows.map((rand) => rand.nume);

  res.json(probe);
});


// ====================
// PROBE - POST
// ====================

app.post("/probe", async (req, res) => {
  const probaNoua = req.body.proba;

  await db.query(
    `
    INSERT INTO probe (nume)
    VALUES ($1)
    `,
    [probaNoua]
  );

  const toateBacteriile = await db.query(
    "SELECT nume FROM bacterii"
  );

  for (const bacterie of toateBacteriile.rows) {
    await db.query(
      `
      INSERT INTO reguli (bacterie, proba, regula)
      VALUES ($1, $2, '')
      ON CONFLICT (bacterie, proba) DO NOTHING
      `,
      [bacterie.nume, probaNoua]
    );
  }

  const rezultat = await db.query(
    "SELECT nume FROM probe ORDER BY nume"
  );

  const probe = rezultat.rows.map((rand) => rand.nume);

  res.json(probe);
});


// ====================
// PROBE - DELETE
// ====================

app.delete("/probe/:nume", async (req, res) => {
  const nume = req.params.nume;

  const rezultat = await db.query(
    "DELETE FROM probe WHERE nume = $1",
    [nume]
  );

  if (rezultat.rowCount === 0) {
    return res.status(404).json({
      mesaj: "Proba nu există"
    });
  }

  await db.query(
    `
    DELETE FROM reguli
    WHERE proba = $1
    `,
    [nume]
  );

  const toateProbele = await db.query(
    "SELECT nume FROM probe ORDER BY nume"
  );

  const probe = toateProbele.rows.map((rand) => rand.nume);

  res.json(probe);
});


// ====================
// TESTĂRI - GET
// ====================

app.get("/testari", async (req, res) => {
  const rezultat = await db.query(
    "SELECT nume FROM testari ORDER BY nume"
  );

  const testari = rezultat.rows.map((rand) => rand.nume);

  res.json(testari);
});


// ====================
// TESTĂRI - POST
// ====================

app.post("/testari", async (req, res) => {
  const testareNoua = req.body.testare;

  await db.query(
    `
    INSERT INTO testari (nume)
    VALUES ($1)
    `,
    [testareNoua]
  );

  const rezultat = await db.query(
    "SELECT nume FROM testari ORDER BY nume"
  );

  const testari = rezultat.rows.map((rand) => rand.nume);

  res.json(testari);
});


// ====================
// TESTĂRI - DELETE
// ====================

app.delete("/testari/:nume", async (req, res) => {
  const nume = req.params.nume;

  const rezultat = await db.query(
    "DELETE FROM testari WHERE nume = $1",
    [nume]
  );

  if (rezultat.rowCount === 0) {
    return res.status(404).json({
      mesaj: "Testarea nu există"
    });
  }

  const toateTestarile = await db.query(
    "SELECT nume FROM testari ORDER BY nume"
  );

  const testari = toateTestarile.rows.map((rand) => rand.nume);

  res.json(testari);
});


// ====================
// REGULI - GET
// ====================

app.get("/reguli", async (req, res) => {
  const rezultat = await db.query(
    `
    SELECT bacterie, proba, regula
    FROM reguli
    `
  );

  res.json(rezultat.rows);
});


// ====================
// REGULI - PUT
// ====================

app.put("/reguli", async (req, res) => {
  const {
    bacterie,
    proba,
    testare,
    card
  } = req.body;

  const regulaNoua =
    testare === "Vitek"
      ? `${testare} ${card}`
      : testare;

  const rezultat = await db.query(
    `
    UPDATE reguli
    SET regula = $1
    WHERE bacterie = $2
    AND proba = $3
    `,
    [regulaNoua, bacterie, proba]
  );

  if (rezultat.rowCount === 0) {
    return res.status(404).json({
      mesaj: "Regula nu a fost găsită"
    });
  }

  const regulaModificata = await db.query(
    `
    SELECT bacterie, proba, regula
    FROM reguli
    WHERE bacterie = $1
    AND proba = $2
    `,
    [bacterie, proba]
  );

  res.json(regulaModificata.rows[0]);
});


// ====================
// PORNIRE SERVER
// ====================

app.listen(PORT, () => {
  console.log(`Server pornit pe portul ${PORT}`);
});