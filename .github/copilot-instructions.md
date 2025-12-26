# Copilot instructions pour le projet TripAdvisor (mini-site)

Objectif rapide
- Ce dépôt est un mini-site statique (HTML/CSS) — pas de build tool, pas de backend.

Architecture & points d'entrée
- Page principale : index.html — le site est totalement rendu côté client.
- Styles et polices : assets/css/ (reset.css, style.css) et assets/fonts/font.css.
- Images : assets/img/ — toutes les références sont relatives dans HTML/CSS.

Comportement attendu pour un agent AI
- Ne pas ajouter de configuration Node/npm par défaut — checkez d'abord si l'utilisateur le demande.
- Modifications visuelles : privilégier des changements CSS ciblés dans `assets/css/style.css`.
- Éviter de déplacer ou renommer des images dans `assets/img/` sauf si l'utilisateur l'approuve.

Conventions et patterns observés
- Mise en page fixe : `.container { width: 1135px; }` — le site utilise une largeur fixe.
- Colonnes récurrentes : classes `col-1`, `col-2` pour structurer les blocs.
- Sections nommées : `.section-1`, `.section-2` — suivre ces noms pour ajouter contenu similaire.
- Carrousels horizontaux : `.section-1 .col-2` utilise `overflow-x: scroll` — conservez ce pattern pour éléments déroulants.

Exemples concrets
- Pour changer la largeur générale : mettez à jour `.container` dans `assets/css/style.css`.
- Pour ajouter un nouveau bloc d'images similaire aux autres : copiez la structure HTML d'un `div.col-caroussel` existant et adaptez l'image dans `assets/img/`.

Dépannage et workflows développeur
- Lancer localement : ouvrir `index.html` dans un navigateur ou démarrer un serveur statique :
  - `python3 -m http.server` depuis la racine du projet
- Pas de tests automatisés détectés.

Intégrations externes
- Font Awesome est chargé via CDN dans `index.html` — ne pas supprimer sans proposer une alternative.

Sécurité et bonnes pratiques spécifiques
- Conserver les chemins relatifs (`./assets/...`) dans HTML/CSS.
- Lorsque vous modifiez polices ou reset.css, validez l'affichage sur la page principale.

Merge / mise à jour
- Si un `.github/copilot-instructions.md` existe déjà, fusionnez le contenu utile en conservant les exemples concrets (liens vers `index.html` et `assets/css/style.css`).

Questions utiles à poser à l'utilisateur
- Voulez-vous rendre le site responsive (ajout de media queries) ?
- Souhaitez-vous introduire un workflow de build (npm, Sass, bundler) ?

Note courte
- Ce fichier décrit uniquement les patterns et workflows observables dans le dépôt actuel.
