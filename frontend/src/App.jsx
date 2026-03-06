import Header from './components/Header'
import { Routes, Route, Navigate } from 'react-router-dom'
import routerConfig from './routing/routerConfig'
import { ProjectsProvider } from './context/projects'

const ProtectedRoute = ({ element }) => {
  const token = localStorage.getItem('accessToken')
  return token ? element : <Navigate to="/login" replace />
}

function App() {
  return (
    <ProjectsProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
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
        </main>
      </div>
    </ProjectsProvider>
  )
}

export default App
