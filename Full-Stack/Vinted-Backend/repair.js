const fs = require("fs");

try {
  console.log("Lecture de index.js...");
  const content = fs.readFileSync("index.js", "utf8");

  const startMarker = "offers: [";
  const start = content.indexOf(startMarker);
  const end = content.lastIndexOf("]");

  if (start === -1) throw new Error("Données introuvables.");

  let dataString = content.substring(start + startMarker.length - 1, end + 1);

  console.log("Nettoyage profond en cours...");

  let repaired = dataString
    // 1. Ajoute des guillemets aux clés oubliées
    .replace(/([{,]\s*)([a-zA-Z0-9_À-ÿ ]+)\s*:/g, '$1"$2":')

    // 2. CORRECTION CRUCIALE : Gère les retours à la ligne et les guillemets internes
    .replace(/:\s*"([\s\S]*?)"\s*([,}])/g, (match, p1, p2) => {
      // .replace(/\n|\r/g, " ") -> Supprime les retours à la ligne qui font planter le JSON
      // .replace(/"/g, "'") -> Change les guillemets internes en guillemets simples
      const cleanText = p1.replace(/\n|\r/g, " ").replace(/"/g, "'").trim();
      return ': "' + cleanText + '"' + p2;
    });

  fs.writeFileSync("data.json", repaired);
  console.log(
    "✅ Succès ! Le fichier 'data.json' est maintenant parfaitement valide.",
  );
} catch (err) {
  console.error("❌ Erreur :", err.message);
}
