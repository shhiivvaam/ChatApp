import './App.css';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage'
import ChatPage from '../src/pages/ChatPage'

function App() {
  return (
    <div className="App min-h-[100vh] flex bg-cover bg-center">
      <Routes>
        <Route path='/' Component={ HomePage } />
        <Route path='/chats' Component={ ChatPage } />
      </Routes>
    </div>
  );
}

export default App;