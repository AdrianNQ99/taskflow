import Header from './components/Header'
import { Routes, Route, Navigate } from 'react-router-dom'
import routerConfig from './routing/routerConfig'

const ProtectedRoute = ({ element }) => {
  const token = localStorage.getItem('accessToken')
  return token ? element : <Navigate to="/login" replace />
}

function App() {
  return (
    <>
      <Header />
      <Routes>
        {routerConfig.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={
              route.protected
                ? <ProtectedRoute element={route.component} />
                : route.component
            }
          />
        ))}
      </Routes>
    </>
  )
}

export default App
