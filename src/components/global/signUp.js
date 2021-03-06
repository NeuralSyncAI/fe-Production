import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import {
  Container,
  Row,
  Button
} from 'react-bootstrap'

import { CustomInput } from "../../reusable"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from "@fortawesome/free-brands-svg-icons"

const logo = require("../../assets/logo.png")

export function SignUp() {

  const navigate = useNavigate()

  const [user, setUser] = useState("")
  const [email, setEmail] = useState("")
  const [emailErr, setEmailErr] = useState("")
  const [pwd, setPwd] = useState("")
  const [pwdErr, setPwdErr] = useState("")
  const [serr, setSerr] = useState("")

  const userEmail = (event) => {
    let val = event.target.value
    if (val) {
      setEmailErr("")
      setEmail(val)
    }
    else {
      setEmailErr("*Please fill this field")
    }
  }

  const userPwd = (event) => {
    let val = event.target.value
    if (val) {
      setPwdErr("")
      setPwd(val)
    }
    else {
      setPwdErr("*Please fill this field")
    }
  }

  const submit = async () => {
    const emailRegex = RegExp(/^\S+@\S+\.\S+$/);
    const pwdRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    if (email === "") {
      setEmailErr("*Please fill this field")
    } else {
      setEmailErr("")
    }
    if (pwd === "") {
      setPwdErr("*Please fill this field")
    } else {
      setPwdErr("")
    }
    if (email !== "" && pwd !== "") {
      if (emailRegex.test(email) === false) {
        setEmailErr("*Email is not Valid")
      } else {
        setEmailErr("")
      }
      if (pwdRegex.test(pwd) === false) {
        setPwdErr("*Password must contain at least 1 lowercase, 1 uppercase, 1 numeric, 1 special char and length of 8 or above.")
      } else {
        setPwdErr("")
      }
    }
    if (emailErr === "" && pwdErr === "") {
      const url = process.env.REACT_APP_URL + "/signup"
      const data = {
        userName: user,
        email: email,
        password: pwd
      }
      try {
        await axios.post(url, data)
        navigate("/landing/login")
      } catch (err) {
        if (err.response &&
          err.response.status >= 400 &&
          err.response.status <= 500) {
          setSerr(err.response.data.Message)
        }
      }
    }
  }
  return (
    <>
      <Container>
        <Row className="d-flex flex-row justify-content-center align-items-center" style={{ height: "100vh" }}>
          <div className='Login-box col-8 border shadow h-6 d-md-flex d-md-column'>
            <div className='part-1 col-12 col-md-6 border-bottom d-flex flex-column justify-content-center align-items-center'>
              <img className='rounded col-md-8 col-4 p-3' src={logo} alt='Neural Sync AI' />
              <h1 className='d-none d-md-block fw-bold'>Neural Sync AI</h1>
            </div>
            <div className='part-2 col-12 col-md-6 border-start d-flex flex-column justify-content-center p-2'>
              <h1 className='text-center'>SIGN-UP</h1>
              <CustomInput type="text" label="User Name" labelColor={"black"} value={user} onChange={(event) => setUser(event.target.value)} />
              <CustomInput type="email" label="Email" labelColor={"black"} value={email} err={emailErr} onChange={(event) => userEmail(event)} />
              <CustomInput type="password" label="Password" labelColor={"black"} value={pwd} err={pwdErr} onChange={(event) => userPwd((event))} />
              {serr && <p className="text-danger">{serr}</p>}
              <Button className='mx-5 my-2' variant='light' onClick={submit}>SIGN-UP</Button>
              {/* <Button className='mx-5' variant='light'><FontAwesomeIcon icon={faGoogle} className="mx-2" />SignUp with Google</Button> */}
              <Link to="/landing/login" className='text-end'>Already have an account ?</Link>
            </div>
          </div>
        </Row>
      </Container>
    </>
  )
}
