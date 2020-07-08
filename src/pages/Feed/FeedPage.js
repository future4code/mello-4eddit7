import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const FeedPages = () => {
  const history = useHistory()

  useEffect(() => {
    const token = localStorage.getItem("token")

    if (token === null) {
      history.push("/")
    }
  }, [history])

  const handleLogout = () => {
    localStorage.clear()
    history.push("/")
  }
  
  return (
    <div>
      Página de feed
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default FeedPages;