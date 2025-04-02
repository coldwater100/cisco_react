import logo from './logo.svg';
import './App.css';
import { Hello } from './component/Hello';
import MyNavbar from './component/MyNavbar';



function App() {
  return (
    <div className="App">
      <MyNavbar></MyNavbar>
      <Hello></Hello>
    </div>
  );
}

export default App;
