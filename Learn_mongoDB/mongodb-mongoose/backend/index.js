import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import User from './model/User.js'; // Importer le modèle d'utilisateur


// Créer l'application Express
const app = express();
const PORT = 3000;

mongoose.connect("mongodb+srv://eliott:eliott@learnmongodb.7g3pa.mongodb.net/?retryWrites=true&w=majority&appName=LearnMongoDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connecté à MongoDB'))
  .catch(err => console.error('Erreur de connexion à MongoDB :', err));

// Middleware
app.use(cors()); // Autoriser les requêtes depuis le frontend
app.use(express.json()); // Analyser le corps des requêtes en JSON

// Route pour ajouter un utilisateur
app.post('/api/users', async (req, res) => {
  const { name, email, password } = req.body;

  // Vérification des données
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Tous les champs sont obligatoires.' });
  }

  try {
    const newUser = new User({ name, email, password });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de l\'ajout de l\'utilisateur.' });
  }
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
