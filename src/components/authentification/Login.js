import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../../contexts/AuthContext"
import { Link, useHistory} from "react-router-dom"
import CenteredContainer from "./CenteredContainer"
import "./Login.css"
export default function Login() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login ,signupFacebook,signupGoogle} = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  async function signupG (e){
    e.preventDefault();
    try {
        setError('')
        setLoading(true)
        await signupGoogle();
        history.push('/dashboard')
    } catch {
        setError('Échec de la connexion')
    }
    setLoading(false)
}
  async function signupF (e){
    e.preventDefault();
    try {
        setError('')
        setLoading(true)
        await signupFacebook();
        history.push('/dashboard')
    } catch {
        setError('Échec de la connexion')
    }
    setLoading(false)
}
  
  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError("")
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      history.push("/")
    } catch {
      setError("Failed to log in")
    }

    setLoading(false)
  }

  return (
    <CenteredContainer >
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Se connecter</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Mot de passe</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <div className="mail1">
            <Button disabled={loading} onClick={handleSubmit} className="mail" type="submit" >
              Se connecter 
            </Button>
            </div>
            <div>

              
            </div>
            <Button disabled={loading} onClick={signupG} className="google" id="signUpGoogle" >Se connecter avec Google</Button>
            <div className="FB1">
            <Button disabled={loading} onClick={signupF} className="facebook" id="signUpFacebook" >Se connecter avec facebook</Button>
            </div>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/forgot-password">Mot de passe oublié?</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Vous n'avez pas encore un compte? <Link to="/signup">S'inscrire</Link>
      </div>
    </CenteredContainer>
  )
}
