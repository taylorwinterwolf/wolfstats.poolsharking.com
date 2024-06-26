import './App.css';
import WinPercents from './components/winpercent';

function App() {
  return (
    <div className="App">
      <WinPercents format="nineball" headerName="Win Percent" />
    </div>
  );
}

export default App;
