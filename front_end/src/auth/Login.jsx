import React, { useState } from "react";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login data submitted:", formData);
    // Handle login logic here (e.g., API call)
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Bienvenue!</h1>
          <p className="py-6">
          Accédez à votre espace personnel pour gérer efficacement vos tâches quotidiennes. 
            Organisez votre travail, suivez votre progression et atteignez vos objectifs avec notre 
            plateforme intuitive de gestion des tâches.
          </p>
        </div>
        
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <fieldset className="fieldset">
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
                
                <div className="mb-4">
                  <label className="label block text-sm font-medium">Password</label>
                  <input 
                    type="password" 
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="input w-full" 
                    placeholder="Password" 
                  />
                </div>
                
                <div className="mb-2">
                  <Link to="/forgot-password" className="link link-hover text-sm">
                    Forgot password?
                  </Link>
                </div>
                
                <button type="submit" className="btn btn-neutral mt-4 w-full">
                  Login
                </button>
                
                <div className="mt-6 text-center text-sm">
                  Don't have an account?{" "}
                  <Link to="/register" className="link link-hover font-semibold">
                    Sign up
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

export default LoginForm;