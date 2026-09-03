import bacterii from "./bacterii.js";
import probe from "./probe.js";

const tabel = bacterii.flatMap((bacterie) =>
  probe.map((proba) => ({
    bacterie,
    proba,
    regula: ""
  }))
);

export default tabel;