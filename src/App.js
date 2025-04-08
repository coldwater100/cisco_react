import logo from './logo.svg';
import './App.css';
import { Hello } from './component/Hello';
import MyNavbar from './component/MyNavbar';
import Register from './component/Register';



function App() {
  return (
    <div className="App">
      <MyNavbar></MyNavbar>
      <Hello></Hello>
      <Register></Register>

    </div>
  );
}

export default App;

