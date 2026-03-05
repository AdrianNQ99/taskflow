import Login from './pages/Login'
import Register from './pages/Register'
import Header from './components/Header'


function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Login />
        <Register />
      </main>
    </div>
  )
}

export default App
