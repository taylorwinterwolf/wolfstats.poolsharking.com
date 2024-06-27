import React from 'react';
import { useDataContext } from './context/dataContext';
import WinPercents from './components/winpercent';
import TeamMatches from './components/teamMatches';
import { groupMatchesByPlayerID } from './functions/functions';

function App() {
  const dataContext = useDataContext();
  const { eightmatches, ninematches, players, teameightmatches, teamninematches } = dataContext;
  const groupedEightMatches = groupMatchesByPlayerID(eightmatches);
  const groupedNineMatches = groupMatchesByPlayerID(ninematches);

  //console.log(teameightmatches);

  return (
    <div className="App">
      <div className='container mx-auto'>
        <div className='grid grid-cols-4'>
          <div>
            <h3>Nine Ball Win%</h3>
            <WinPercents players={players} groupedMatches={groupedNineMatches} />
          </div>
          
          <div>
            <h3>Eight Ball Win%</h3>
            <WinPercents players={players} groupedMatches={groupedEightMatches} />
          </div>
          <div>
            <h3>Team Nine Ball Matches</h3>
            <TeamMatches matches={teameightmatches} />
          </div>
        </div>
      </div>
    </div>
  );
}
export default App;

