import './App.css';
import Login from './Login'
import Mainboard from './Mainboard';

const code = new URLSearchParams(window.location.search).get('code')

function App() {
  return code ? <Mainboard code={code} /> : <Login />
}

export default App;
