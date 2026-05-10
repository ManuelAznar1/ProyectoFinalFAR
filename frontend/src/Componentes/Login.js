import React, { useState } from 'react';
import axios from 'axios';
import '../estilos/loginEstilos.css';

const Login = ({ onLoginSuccess }) => {
    const [isRegister, setIsRegister] = useState(true); 
    const [formData, setFormData] = useState({ email: '', user: '', password: '' });
    const [error, setError] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (error) setError(""); 
        if (successMsg) setSuccessMsg("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail|hotmail|outlook|yahoo|icloud|live)\.(com|es|net)$/;

        if (!emailRegex.test(formData.email.toLowerCase())) {
            setError("Introduce un correo válido (ej: nombre@gmail.com)");
            return;
        }
        if (formData.password.length < 6) {
            setError("La contraseña debe tener al menos 6 caracteres.");
            return;
        }

        const urlBase = "http://127.0.0.1:8000/api";

        try {
            if (isRegister) {
                await axios.post(`${urlBase}/registrar`, {
                    nombre: formData.user, 
                    gmail: formData.email,
                    password: formData.password
                });

                setSuccessMsg("¡Cuenta creada con éxito! Ya puedes ingresar.");
                
                setTimeout(() => {
                    setIsRegister(false);
                    setSuccessMsg("");
                    setFormData({ ...formData, password: '' });
                    setShowPassword(false);
                }, 2500);

            } else {
                const res = await axios.post(`${urlBase}/login`, {
                    gmail: formData.email,
                    password: formData.password
                });

                sessionStorage.setItem('usuario_actual', JSON.stringify({
                    user: res.data.user.nombre,
                    email: res.data.user.gmail
                }));
                
                onLoginSuccess();
            }
        } catch (err) {
            setError(err.response?.data?.message || "Error de conexión con el servidor");
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <h1 className="system-title">FAR SYSTEM</h1>
                
                <div className="tab-group">
                    <button 
                        type="button"
                        className={`tab-btn ${!isRegister ? 'active' : ''}`}
                        onClick={() => { setIsRegister(false); setError(""); setSuccessMsg(""); setShowPassword(false); }}
                    >
                        INICIAR SESIÓN
                    </button>
                    <button 
                        type="button"
                        className={`tab-btn-green ${isRegister ? 'active-green' : ''}`}
                        onClick={() => { setIsRegister(true); setError(""); setSuccessMsg(""); setShowPassword(false); }}
                    >
                        REGISTRARSE
                    </button>
                </div>

                {error && <div className="error-alert">{error}</div>}
                {successMsg && <div className="success-alert">{successMsg}</div>}

                <form className="login-form" onSubmit={handleSubmit}>
                    <div className={`input-group ${error.includes("correo") ? 'input-error' : ''}`}>
                        <input 
                            type="text" 
                            name="email"
                            placeholder="Correo Electrónico" 
                            value={formData.email}
                            onChange={handleInputChange}
                            autoComplete="off"
                            required 
                        />
                    </div>
                    
                    {isRegister && (
                        <div className="input-group">
                            <input 
                                type="text" 
                                name="user"
                                placeholder="Usuario" 
                                value={formData.user}
                                onChange={handleInputChange}
                                autoComplete="off"
                                required 
                            />
                        </div>
                    )}
                    
                    <div className={`input-group password-wrapper ${error.includes("contraseña") ? 'input-error' : ''}`}>
                        <input 
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Contraseña" 
                            value={formData.password}
                            onChange={handleInputChange}
                            required 
                        />
                        <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? "👁️" : "👁️‍🗨️"}
                        </span>
                    </div>

                    <button type="submit" className="btn-submit">
                        {isRegister ? "CREAR CUENTA" : "INICIAR SESIÓN"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;