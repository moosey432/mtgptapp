import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles.css'

const mountNode = document.getElementById('root') || document.getElementById('app') || (() => {
  const node = document.createElement('div')
  node.id = 'root'
  document.body.appendChild(node)
  return node
})()

ReactDOM.createRoot(mountNode).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
