import { useState } from 'react'

function App() {

  fetch('http://localhost:3000/search/naruto').then( data => {
    data.json().then( data => {
      console.log(data)
    })
  })

  return (
    <main>


    </main>
  )
}

export default App
