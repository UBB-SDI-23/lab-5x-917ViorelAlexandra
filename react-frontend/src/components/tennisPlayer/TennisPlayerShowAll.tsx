import { useEffect, useState } from "react";
import { TennisPlayer } from "../../models/TennisPlayer";



export const TennisPlayerShowAll = () => {
    const [tennisPlayers, setTennisPlayers] = useState([]);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/application/tennisplayer/")
            .then(response => response.json())
            .then(data => setTennisPlayers(data));
    }, []);

    console.log(tennisPlayers);

    if (tennisPlayers.length == 0) {
        return <div>No tennis players!</div>
    }

  
    return (
        <div className="App">
            <h1>Tennis Players</h1>
            <table>
                <tr>
                    <th>#</th>
                    <th>Player first name</th>
                    <th>Player last name</th>
                    <th>Rank</th>
                </tr>
                {tennisPlayers.map((player: TennisPlayer, index) => (
                    <tr>
                        <td>{index}</td>
                        <td>{player.tp_first_name}</td>
                        <td>{player.tp_last_name}</td>
                        <td>{player.tp_rank}</td>
                        <td>{player.tp_date_of_birth}</td>
                        <td>{player.tp_country}</td>
                        <td>{player.tp_gender}</td>
                    </tr>
                ))}
            </table>
        </div>
    )
  }