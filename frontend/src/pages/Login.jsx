import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { login, register } from "../services/api"

import "./auth.css"


export default function Login() {

    const navigate = useNavigate()

    // Tab state: "login" or "register"
    const [activeTab, setActiveTab] = useState("login")

    // Login fields
    const [phone, setPhone] = useState("")
    const [mpin, setMpin] = useState("")
    const [showMpin, setShowMpin] = useState(false)

    // Register fields
    const [regName, setRegName] = useState("")
    const [regEmail, setRegEmail] = useState("")
    const [regPhone, setRegPhone] = useState("")
    const [regMpin, setRegMpin] = useState("")
    const [showRegMpin, setShowRegMpin] = useState(false)

    // UI state
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [loading, setLoading] = useState(false)


    const handleLogin = async (e) => {

        e.preventDefault()
        setError("")
        setLoading(true)

        try {

            const data = await login({
                phone_number: phone,
                mpin: mpin
            })

            localStorage.setItem("token", data.access_token)

            navigate("/dashboard")

        } catch (err) {

            setError(err.message)

        } finally {

            setLoading(false)

        }

    }


    const handleRegister = async (e) => {

        e.preventDefault()
        setError("")
        setSuccess("")
        setLoading(true)

        try {

            const data = await register({
                name: regName,
                email: regEmail,
                phone_number: regPhone,
                mpin: regMpin
            })

            localStorage.setItem("token", data.access_token)

            setSuccess("Account created successfully! Redirecting...")

            setTimeout(() => navigate("/dashboard"), 1500)

        } catch (err) {

            setError(err.message)

        } finally {

            setLoading(false)

        }

    }


    const switchTab = (tab) => {
        setActiveTab(tab)
        setError("")
        setSuccess("")
    }


    return (

        <div className="auth-page">

            {/* ── Left Branding Panel ── */}
            <div className="auth-brand">

                <div className="brand-logo">

                    <div className="brand-logo-icon">
                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2L2 7v2h20V7L12 2zM4 11v7c0 2.21 3.58 4 8 4s8-1.79 8-4v-7H4zm8 9c-3.87 0-6-1.35-6-2v-4.47C7.36 14.43 9.53 15 12 15s4.64-.57 6-1.47V18c0 .65-2.13 2-6 2z" />
                        </svg>
                    </div>

                    <div className="brand-logo-text">
                        <h1>Underseas Bank</h1>
                        <p>Digital Banking</p>
                    </div>

                </div>

                <div className="brand-headline">
                    <h2>Banking Beyond Boundaries</h2>
                    <p>
                        Secure, fast, and intelligent banking at your fingertips.
                        Manage accounts, transfers, and investments — all in one place.
                    </p>
                </div>

                <div className="brand-features">

                    <div className="brand-feature">
                        <div className="brand-feature-icon">
                            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                            </svg>
                        </div>
                        <span>256-bit AES Encryption</span>
                    </div>

                    <div className="brand-feature">
                        <div className="brand-feature-icon">
                            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="12" cy="12" r="10" />
                                <polyline points="12 6 12 12 16 14" />
                            </svg>
                        </div>
                        <span>24/7 Instant Transfers</span>
                    </div>

                    <div className="brand-feature">
                        <div className="brand-feature-icon">
                            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                                <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                                <line x1="12" y1="22.08" x2="12" y2="12" />
                            </svg>
                        </div>
                        <span>AI-Powered Financial Insights</span>
                    </div>

                </div>

                <div className="brand-footer">
                    <div className="dot"></div>
                    <span>System Status: Operational</span>
                    <span>•</span>
                    <span>v2.0.0</span>
                </div>

                {/* Decorative waves */}
                <div className="brand-waves">
                    <svg viewBox="0 0 500 200" preserveAspectRatio="none">
                        <path d="M0,100 C150,180 350,20 500,100 L500,200 L0,200 Z"
                            fill="rgba(255,255,255,0.03)" />
                        <path d="M0,120 C180,200 320,60 500,120 L500,200 L0,200 Z"
                            fill="rgba(255,255,255,0.02)" />
                    </svg>
                </div>

            </div>


            {/* ── Right Form Panel ── */}
            <div className="auth-form-panel">

                <div className="auth-card">

                    <div className="auth-card-header">
                        <h2>{activeTab === "login" ? "Welcome Back" : "Create Account"}</h2>
                        <p>
                            {activeTab === "login"
                                ? "Enter your credentials to access your account"
                                : "Join Underseas Bank — it takes less than a minute"}
                        </p>
                    </div>

                    {/* Tab Toggle */}
                    <div className="auth-tabs">
                        <button
                            className={`auth-tab ${activeTab === "login" ? "active" : ""}`}
                            onClick={() => switchTab("login")}
                        >
                            Sign In
                        </button>
                        <button
                            className={`auth-tab ${activeTab === "register" ? "active" : ""}`}
                            onClick={() => switchTab("register")}
                        >
                            Sign Up
                        </button>
                    </div>


                    {/* Error / Success Messages */}
                    {error && (
                        <div className="auth-error">
                            <svg className="auth-error-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10" />
                                <line x1="15" y1="9" x2="9" y2="15" />
                                <line x1="9" y1="9" x2="15" y2="15" />
                            </svg>
                            <p>{error}</p>
                        </div>
                    )}

                    {success && (
                        <div className="auth-success">
                            <p>✓ {success}</p>
                        </div>
                    )}


                    {/* ── LOGIN FORM ── */}
                    {activeTab === "login" && (

                        <form className="auth-form" onSubmit={handleLogin}>

                            <div className="form-group">
                                <label>Phone Number</label>
                                <div className="input-wrapper">
                                    <div className="input-icon">
                                        <svg viewBox="0 0 24 24">
                                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                                        </svg>
                                    </div>
                                    <input
                                        type="tel"
                                        placeholder="Enter 10-digit phone number"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        maxLength={10}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="form-row">
                                    <label>MPIN</label>
                                    <span className="forgot-link">Forgot MPIN?</span>
                                </div>
                                <div className="input-wrapper">
                                    <div className="input-icon">
                                        <svg viewBox="0 0 24 24">
                                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                        </svg>
                                    </div>
                                    <input
                                        type={showMpin ? "text" : "password"}
                                        placeholder="Enter 4-digit MPIN"
                                        value={mpin}
                                        onChange={(e) => setMpin(e.target.value)}
                                        maxLength={4}
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="toggle-password"
                                        onClick={() => setShowMpin(!showMpin)}
                                    >
                                        {showMpin ? (
                                            <svg viewBox="0 0 24 24">
                                                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                                                <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                                                <line x1="1" y1="1" x2="23" y2="23" />
                                            </svg>
                                        ) : (
                                            <svg viewBox="0 0 24 24">
                                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                                <circle cx="12" cy="12" r="3" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="auth-submit"
                                disabled={loading}
                            >
                                {loading ? "Signing in..." : "Sign In to Dashboard"}
                            </button>

                        </form>

                    )}


                    {/* ── REGISTER FORM ── */}
                    {activeTab === "register" && (

                        <form className="auth-form" onSubmit={handleRegister}>

                            <div className="form-group">
                                <label>Full Name</label>
                                <div className="input-wrapper">
                                    <div className="input-icon">
                                        <svg viewBox="0 0 24 24">
                                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                            <circle cx="12" cy="7" r="4" />
                                        </svg>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Enter your full name"
                                        value={regName}
                                        onChange={(e) => setRegName(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Email Address</label>
                                <div className="input-wrapper">
                                    <div className="input-icon">
                                        <svg viewBox="0 0 24 24">
                                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                            <polyline points="22,6 12,13 2,6" />
                                        </svg>
                                    </div>
                                    <input
                                        type="email"
                                        placeholder="name@example.com"
                                        value={regEmail}
                                        onChange={(e) => setRegEmail(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Phone Number</label>
                                <div className="input-wrapper">
                                    <div className="input-icon">
                                        <svg viewBox="0 0 24 24">
                                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                                        </svg>
                                    </div>
                                    <input
                                        type="tel"
                                        placeholder="Enter 10-digit phone number"
                                        value={regPhone}
                                        onChange={(e) => setRegPhone(e.target.value)}
                                        maxLength={10}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Set MPIN (4 digits)</label>
                                <div className="input-wrapper">
                                    <div className="input-icon">
                                        <svg viewBox="0 0 24 24">
                                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                        </svg>
                                    </div>
                                    <input
                                        type={showRegMpin ? "text" : "password"}
                                        placeholder="Create a 4-digit MPIN"
                                        value={regMpin}
                                        onChange={(e) => setRegMpin(e.target.value)}
                                        maxLength={4}
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="toggle-password"
                                        onClick={() => setShowRegMpin(!showRegMpin)}
                                    >
                                        {showRegMpin ? (
                                            <svg viewBox="0 0 24 24">
                                                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                                                <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                                                <line x1="1" y1="1" x2="23" y2="23" />
                                            </svg>
                                        ) : (
                                            <svg viewBox="0 0 24 24">
                                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                                <circle cx="12" cy="12" r="3" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="auth-submit"
                                disabled={loading}
                            >
                                {loading ? "Creating Account..." : "Create Account"}
                            </button>

                        </form>

                    )}


                    {/* Security badges */}
                    <div className="auth-security">
                        <div className="security-badge">
                            <svg viewBox="0 0 24 24">
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                            </svg>
                            Secure Session
                        </div>
                        <div className="security-badge">
                            <svg viewBox="0 0 24 24">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                            </svg>
                            AES-256
                        </div>
                        <div className="security-badge">
                            <svg viewBox="0 0 24 24">
                                <polyline points="20 6 9 17 4 12" />
                            </svg>
                            RBI Compliant
                        </div>
                    </div>

                </div>

            </div>

        </div>

    )

}