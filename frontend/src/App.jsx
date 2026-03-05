import Header from './components/Header'
import { Routes,Route } from 'react-router-dom'
import routerConfig from './routing/routerConfig'


function App() {
  return (
    <>
    <Header />
    <Routes>
      {routerConfig.map((route, index) => (
        <Route key={index} path={route.path} element={route.component} />
      ))}
    </Routes>
    </>
  )
}

export default App
