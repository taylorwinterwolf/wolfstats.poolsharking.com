import React from 'react';
import { useDataContext } from './context/dataContext';
import WinPercents from './components/winpercent';
import TeamMatches from './components/teamMatches';
import MatchSum from './components/matchSum';
import { groupMatchesByPlayerID } from './functions/functions';

function App() {
  const dataContext = useDataContext();
  const { eightmatches, ninematches, players, teameightmatches, teamninematches } = dataContext;
  const groupedEightMatches = groupMatchesByPlayerID(eightmatches);
  const groupedNineMatches = groupMatchesByPlayerID(ninematches);

  console.log(groupedNineMatches);

  return (
    <div className="App">
      <div className='container mx-auto'>
        <div className='grid grid-cols-4 mb-4'>
          <div>
            <h3>Total Eight Match Points</h3>
            <MatchSum players={players} groupedMatches={groupedEightMatches} category='matchPoints'/>
          </div>
          <div>
            <h3>Total Eight Racks Won</h3>
            <MatchSum players={players} groupedMatches={groupedEightMatches} category='racksWon'/>
          </div>
          <div>
            <h3>Team Eight Ball Matches</h3>
          </div>
          <div>
            <h3>Team Nine Ball Matches</h3>
          </div>
        </div>
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
            <h3>Team Eight Ball Matches</h3>
            <TeamMatches matches={teameightmatches} />
          </div>
          <div>
            <h3>Team Nine Ball Matches</h3>
            <TeamMatches matches={teamninematches} />
          </div>
        </div>
      </div>
    </div>
  );
}
export default App;

