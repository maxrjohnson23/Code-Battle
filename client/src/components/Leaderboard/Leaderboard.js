import React from "react";
import axios from "axios";
import "./Leaderboard.css";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faTrophy from "@fortawesome/fontawesome-free-solid/faTrophy";


class Leaderboard extends React.Component {
  state = {
    leaderboard: []
  };

  componentDidMount() {
    axios.get("/user/leaderboard").then(res => {
      this.setState({
        leaderboard: res.data
      });
    });
  }

  render() {
    const firstPlace = (<FontAwesomeIcon icon={faTrophy} color="gold"/>);
    const secondPlace = (<FontAwesomeIcon icon={faTrophy} color="silver"/>);
    const thirdPlace = (<FontAwesomeIcon icon={faTrophy} color="#CD7F32"/>);
    const hiddenPlace = (<FontAwesomeIcon icon={faTrophy} color="black"/>);
    const rankings = [firstPlace, secondPlace, thirdPlace];

    return (
        <aside className="leaderboard">
          <h2>Leaderboard</h2>
          <hr/>
          <table>
            <tbody>
            {
              this.state.leaderboard.map((user, index) => (
                  <tr key={user._id}>
                    <td><span className="userIndex">{index + 1}.</span> <span
                        className="userScore">{rankings[index] ? rankings[index] :
                        <span
                            style={{visibility: "hidden"}}>{hiddenPlace}</span>}</span>
                    </td>
                    <td><span className="userScore">{user.score}</span></td>
                    <td><span className="userName">{user.username}</span></td>
                  </tr>
              ))
            }
            </tbody>
          </table>
        </aside>
    );
  }
}

export default Leaderboard;