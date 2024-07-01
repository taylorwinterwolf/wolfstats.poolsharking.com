import React from 'react';
import { useDataContext } from './context/dataContext';
import WinPercents from './components/winpercent';
import TeamMatches from './components/teamMatches';
import MatchSum from './components/matchSum';
import TheZeros from './components/theZeros';

function App() {
  const dataContext = useDataContext();
  const { groupedEightMatches, groupedNineMatches, players, teameightmatches, teamninematches } = dataContext;

  return (
    <div className="App">
      <div className='container mx-auto'>
        <div className='grid grid-cols-4 mb-4'>
          <div>
            <h3>Total Matches Played</h3>
            {players.map(player => (
              <div key={player.id}>
                <p>{player.completeName} <span className='eightTotalMatches'>{groupedEightMatches[player.id].length}</span> <span className='nineTotalMatches'>{groupedNineMatches[player.id].length}</span></p>
              </div>
            ))}
          </div>
          <div>
            <h3>8 Two Zero Leaders</h3>
            <TheZeros players={players} groupedMatches={groupedEightMatches} category='twoZeros' />
          </div>
          <div>
            <h3>8 Three Zero Leaders</h3>
            <TheZeros players={players} groupedMatches={groupedEightMatches} category='threeZeros' />
          </div>
          <div>
            <h3>Total Nine Points</h3>
          </div>
        </div>
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
            <h3>Total Nine Match Points</h3>
            <MatchSum players={players} groupedMatches={groupedNineMatches} category='matchPoints' />
          </div>
          <div>
            <h3>Total Nine Points</h3>
            <MatchSum players={players} groupedMatches={groupedNineMatches} category='pointsMade' />
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

