import { useState } from 'react'

function App() {

  fetch('http://localhost:3000').then( data => {
    console.log( data.json());
  })

  return (
    <main>

    </main>
  )
}

export default App
