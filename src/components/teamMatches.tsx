import { TeamMatch } from "../types/teamMatchType";
import { calcMatchResults } from '../functions/functions';

type TeamMatchesProps = {
    matches: TeamMatch[] ;
}

const TeamMatches = (props: TeamMatchesProps) => {
    const teamMatches = props.matches;
    const teamMatchResults = calcMatchResults(props.matches);
    //console.log(teamMatches);
    //console.log(teamMatchResults);

    const redLine = {
        borderRight: '4px solid #bc837d',
    }
    const greenLine = {
        borderRight: '4px solid #67a567',
    }
    const goldLine = {
        borderRight: '4px solid #d2b461',
    }

    return (
        <div>
            <div className="grid grid-cols-3 text-center">
                <div className="bold">Win {teamMatchResults.winPercent}%</div>
                <div className="bold">Tie {teamMatchResults.tiePercent}%</div>
                <div className="bold">Loss {teamMatchResults.lossPercent}%</div>
            </div>
            {teamMatches.map(match => {
                //Must convert to float to compare
                let matchPoints = parseFloat(match.matchPoints)
                let opposingTeamPoints = parseFloat(match.opposingTeamPoints)
                return (
                    <div key={match.id} className="grid grid-cols-12 mb-1">
                        <div className="xl:col-span-10 md:col-span-9 col-span-9 bold">{match.opposingTeamName}</div>
                        <div className="xl:col-span-2 md:col-span-3 col-span-3 text-center" style={match.matchResult === '1' ? greenLine : match.matchResult === '0' ? redLine : goldLine}>
                            {opposingTeamPoints > matchPoints ? opposingTeamPoints : matchPoints} - {opposingTeamPoints < matchPoints ? opposingTeamPoints : matchPoints}
                        </div>
                    </div>
                );
            })} 
        </div>
    )
}
export default TeamMatches;