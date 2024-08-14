import "./App.css";
import { useDataContext } from './context/dataContext';
import WinPercents from './components/winPercent';
import TeamMatches from './components/teamMatches';
import MatchSum from './components/matchSum';
import TheZeros from './components/theZeros';

function App() {
  const dataContext = useDataContext();
  const { groupedEightMatches, groupedNineMatches, players, teameightmatches, teamninematches, dateupdated } = dataContext;

  return (
    <div className="wrapper">
      <div className="text-center smlText bold p-0 m-0">Updated On: {dateupdated}</div>
        <div className='grid md:grid-cols-3 mb-4'>
          <div className="p-2">
            <div className="sectionHeader defaultBG">Total Matches Played</div>
            {players.map(player => (
              <div key={player.id} className="grid grid-cols-10 underlineLgtBg mb-1">
                <div className="col-span-8 boldName">{player.completeName}</div>
                <div className='col-span-1 bold eightplays text-center'>{groupedEightMatches[player.id].length}</div>
                <div className='col-span-1 bold nineplays text-center'>{groupedNineMatches[player.id].length}</div>
              </div>
            ))}
          </div>
          <div className="p-2">
            <div className="sectionHeader eightBG">Team Eight Ball Matches</div>
            <TeamMatches matches={teameightmatches} />
          </div>
          <div className="p-2">
            <div className="sectionHeader nineBG">Team Nine Ball Matches</div>
            <TeamMatches matches={teamninematches} />
          </div>
        </div>
        <div className="grid md:grid-cols-2">
          <div className='eightBall'>
            <div className="formatHeader">Eight Ball</div>
            <div className="grid xl:grid-cols-2">
              <div className="p-2">
                <div className="leaderHead">Win Percent</div>
                <WinPercents players={players} groupedMatches={groupedEightMatches} format="eight" />
              </div>
              <div className="p-2">
                <div className="leaderHead">Total Match Points</div>
                <MatchSum players={players} groupedMatches={groupedEightMatches} category='matchPoints' format="eight"/>
              </div>
              <div className="p-2">
                <div className="leaderHead">Total Racks Won</div>
                <MatchSum players={players} groupedMatches={groupedEightMatches} category='racksWon' format="eight"/>
              </div>
              <div className="p-2">
                <div className="leaderHead">Two 0's</div>
                <TheZeros players={players} groupedMatches={groupedEightMatches} category='twoZeros' />
              </div>
              <div className="p-2">
                <div className="leaderHead">Three 0's</div>
                <TheZeros players={players} groupedMatches={groupedEightMatches} category='threeZeros' />
              </div>
            </div>
          </div>
        <div className='nineBall'>
            <div className="formatHeader">Nine Ball</div>
            <div className="grid xl:grid-cols-2">
              <div className="p-2">
                <div className="leaderHead">Win Percent</div>
                <WinPercents players={players} groupedMatches={groupedNineMatches} format="nine" />
              </div>
              <div className="p-2">
                <div className="leaderHead">Total Match Points</div>
                <MatchSum players={players} groupedMatches={groupedNineMatches} category='matchPoints' format="nine" />
              </div>
              <div className="p-2">
                <div className="leaderHead">Total Points</div>
                <MatchSum players={players} groupedMatches={groupedNineMatches} category='pointsMade' format="nine" />
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}
export default App;

