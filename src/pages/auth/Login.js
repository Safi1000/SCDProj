"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import { motion } from "framer-motion"
import { ChevronLeft, Mail, Lock } from "lucide-react"
import { getImage } from "../../utils/imageApi"
import { NewtonsCradle } from 'ldrs/react'
import 'ldrs/react/NewtonsCradle.css'
import styled from "styled-components";

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [backgroundImage, setBackgroundImage] = useState("")
  const [validationErrors, setValidationErrors] = useState({})
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const fetchImage = async () => {
      const imageUrl = await getImage("technology background", { orientation: 'landscape' })
      setBackgroundImage(imageUrl)
    }
    fetchImage()
  }, [])

  const validateForm = () => {
    const errors = {}
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    
    if (!email) {
      errors.email = "Email is required"
    } else if (!emailRegex.test(email)) {
      errors.email = "Please enter a valid email address"
    }
    
    if (!password) {
      errors.password = "Password is required"
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters"
    }
    
    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    try {
      setError("")
      setLoading(true)
      await login(email, password)
      await new Promise(resolve => setTimeout(resolve, 500))
      const redirectPath = new URLSearchParams(location.search).get('redirect') || '/'
      navigate(redirectPath)
    } catch (error) {
      setError("Failed to sign in. Please check your credentials.")
    } finally {
      setLoading(false)
    }
  }

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Left side - Image */}
      <div className="hidden md:block md:w-1/2 relative">
        <img
          src={backgroundImage || "/placeholder.svg"}
          alt="Fashion"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center p-8">
            <h1 className="text-5xl font-bold mb-4 font-poppins">
              <span className="text-gray-400">SHOP</span>
              <span className="text-white">EASE</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-md mx-auto font-inter">
              Your premium shopping destination with uncompromising quality.
            </p>
          </div>
        </div>
      </div>

      {/* Animated Divider */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 h-full w-[4px] hidden md:block overflow-hidden">
        <motion.div
          initial={{ y: "-100%" }}
          animate={{ 
            y: "100%",
          }}
          transition={{ 
            repeat: Infinity,
            duration: 3,
            ease: "linear"
          }}
          className="absolute top-0 w-full h-full bg-gradient-to-b from-transparent via-white to-transparent"
        />
        <div className="absolute inset-0 bg-gray-800 opacity-20"></div>
      </div>

      {/* Right side - Login form */}
      <div className="w-full md:w-1/2 p-8 flex items-center justify-center">
        <div className="max-w-md w-full">
          <Link to="/" className="flex items-center text-gray-400 hover:text-white transition-colors mb-8 font-inter">
            <ChevronLeft className="h-5 w-5 mr-1" />
            Back to Home
          </Link>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="bg-gray-900 p-8 rounded-[12px] border border-gray-800"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold font-poppins">SIGN IN</h2>
              <p className="mt-2 text-gray-400 font-inter">Welcome back to ShopEase</p>
            </div>

            {error && (
              <div className="bg-black border border-red-500 text-red-400 px-4 py-3 rounded-[12px] mb-6 font-inter">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2 font-inter">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-500" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full pl-10 px-4 py-3 bg-black border ${
                      validationErrors.email ? 'border-red-500' : 'border-gray-800'
                    } rounded-[12px] focus:outline-none focus:border-white transition-colors text-white font-inter`}
                    placeholder="Enter your email"
                  />
                </div>
                {validationErrors.email && (
                  <p className="mt-1 text-sm text-red-500 font-inter">{validationErrors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2 font-inter">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-500" />
                  </div>
                  <input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full pl-10 px-4 py-3 bg-black border ${
                      validationErrors.password ? 'border-red-500' : 'border-gray-800'
                    } rounded-[12px] focus:outline-none focus:border-white transition-colors text-white font-inter`}
                    placeholder="Enter your password"
                  />
                </div>
                {validationErrors.password && (
                  <p className="mt-1 text-sm text-red-500 font-inter">{validationErrors.password}</p>
                )}
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-white text-black px-4 py-3 rounded-[12px] hover:bg-gray-200 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed font-inter"
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <NewtonsCradle
                        size="30"
                        speed="1.4"
                        color="black"
                      />
                    </span>
                  ) : (
                    "SIGN IN"
                  )}
                </button>
              </div>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-400 font-inter">
                Don't have an account?{" "}
                <Link 
                  to={`/register${location.search}`} 
                  className="text-white hover:text-gray-300 font-medium"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

