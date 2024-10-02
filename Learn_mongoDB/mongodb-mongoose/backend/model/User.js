import mongoose from 'mongoose';

// Définir le schéma de l'utilisateur
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

// Créer et exporter le modèle
const User = mongoose.model('User', userSchema);
export default User;
