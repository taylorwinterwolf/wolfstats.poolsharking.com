import { TeamMatch } from "../types/teamMatchType";
import { calcMatchResults } from '../functions/functions';

type TeamMatchesProps = {
    matches: TeamMatch[] ;
}

const TeamMatches = (props: TeamMatchesProps) => {
    const teamMatches = props.matches;
    const teamMatchResults = calcMatchResults(props.matches);
    console.log(teamMatches);
    //console.log(teamMatchResults);

    const redBG = {
        borderBottom: '2px solid #bc837d',
    }
    const greenBG = {
        borderBottom: '2px solid #67a567',
    }
    const goldBG = {
        borderBottom: '2px solid #d2b461',
    }

    return (
        <div>
            <div className="grid grid-cols-3">
                <div className="bold">Win {teamMatchResults.winPercent}%</div>
                <div className="bold">Tie {teamMatchResults.tiePercent}%</div>
                <div className="bold">Loss {teamMatchResults.lossPercent}%</div>
            </div>
            {teamMatches.map(match => (
                <div key={match.id} className="grid grid-cols-12">
                    <div className="col-span-10 bold">{match.opposingTeamName}</div>
                    <div className="col-span-2 text-center" style={match.matchResult === '1' ? greenBG : match.matchResult === '0' ? redBG : goldBG}>
                        {match.opposingTeamPoints} - {match.matchPoints}
                    </div>
                </div>
            ))} 
        </div>
    )
}
export default TeamMatches;