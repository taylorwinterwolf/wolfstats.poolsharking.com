import React from 'react';
import { useDataContext } from './context/dataContext';
import WinPercents from './components/winpercent';
import { groupMatchesByPlayerID } from './functions/functions';


function App() {
  const dataContext = useDataContext();
  const { eightmatches, ninematches, players } = dataContext;
  const groupedEightMatches = groupMatchesByPlayerID(eightmatches);
  const groupedNineMatches = groupMatchesByPlayerID(ninematches);

  console.log(eightmatches);

  return (
    <div className="App">
      <div>Nine Ball Win%</div>
      <WinPercents players={players} groupedMatches={groupedNineMatches}/>
      <div>Eight Ball Win%</div>
      <WinPercents players={players} groupedMatches={groupedEightMatches} />
    </div>
  );
}
export default App;
