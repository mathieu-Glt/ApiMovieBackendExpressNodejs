const multer = require('multer');
const path = require('path');

// Configuration de Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images'); // Spécifiez le dossier de destination des fichiers téléchargés
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Utilisez le nom d'origine du fichier comme nom de fichier
  }
});

const upload = multer({ storage: storage });

module.exports = upload;
