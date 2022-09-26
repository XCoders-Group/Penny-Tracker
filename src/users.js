import 'css/users.css'
import GoogleLogin from 'react-google-login'
import { useState } from 'react'

console.log("works read")
function Users() {
  const [loginData, setLoginData] = useState(localStorage.getItem('loginData') ? JSON.parse(localStorage.getItem('loginData')) : null)

  const handleFailure = result => {
    alert(result)
  }

  const handleLogin = async googleData => {
    const res = await fetch('/api/google-login', {
      method: 'POST',
      body: JSON.stringify({
        token: googleData.tokenId,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const data = await res.json()
    setLoginData(data)
    localStorage.setItem('loginData', JSON.stringify(data))
  }
  const handleLogout = () => {
    localStorage.removeItem('loginData')
    setLoginData(null)
  }

  return (
    <div className='users'>
      <header className='users-header'>
        <h1>Penny Tracker</h1>
        <div>
          {loginData ? (
            <div>
              <h3>You logged in as {loginData.email}</h3>
              <button onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
              buttonText='Log in with Google'
              onSuccess={handleLogin}
              onFailure={handleFailure}
              cookiePolicy={'single_host_origin'}
            ></GoogleLogin>
          )}
        </div>
      </header>
    </div>
  )
}

export default Users