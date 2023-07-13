import React from 'react'

import Usernotes from './Usernotes'
import Addnote from './addnote'
const Home = () => {
  return (
    
    <div>
      {/* this is home {val.state1.name} */}
      <div className="form">  
      <h2>Add notes</h2>
        <Addnote/>
        <Usernotes/>
      </div>

    </div>
  )
}

export default Home
