import React, { useState } from "react";
import { Link } from "react-router-dom";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log("Form submitted:", formData);
    // Handle form submission logic here
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Créez votre compte</h1>
          <p className="py-6">
            Rejoignez notre plateforme de gestion des tâches pour améliorer votre productivité. 
            Créez, organisez et suivez vos tâches en toute simplicité. Commencez dès aujourd'hui 
            à optimiser votre temps et votre efficacité.
          </p>
        </div>
        
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <fieldset className="fieldset">
                {/* Username */}
                <div className="mb-4">
                  <label className="label block text-sm font-medium">Nom d'utilisateur</label>
                  <input 
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    className="input w-full" 
                    placeholder="Nom d'utilisateur" 
                  />
                </div>
                
                {/* Email */}
                <div className="mb-4">
                  <label className="label block text-sm font-medium">Email</label>
                  <input 
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="input w-full" 
                    placeholder="Email" 
                  />
                </div>
                
                {/* Password */}
                <div className="mb-4">
                  <label className="label block text-sm font-medium">Mot de passe</label>
                  <input 
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="input w-full" 
                    placeholder="Mot de passe" 
                  />
                </div>
                
                {/* Confirm Password */}
                <div className="mb-4">
                  <label className="label block text-sm font-medium">Confirmer le mot de passe</label>
                  <input 
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="input w-full" 
                    placeholder="Confirmer le mot de passe" 
                  />
                </div>
                
                <button type="submit" className="btn btn-neutral mt-4 w-full">
                  S'inscrire
                </button>
                
                <div className="mt-6 text-center text-sm">
                  Vous avez déjà un compte?{" "}
                  <Link to="/login" className="link link-hover font-semibold">
                    Se connecter
                  </Link>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;