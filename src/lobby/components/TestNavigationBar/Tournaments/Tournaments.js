import React from 'react';

import './_tournaments.sass';

export default class Tournaments extends React.Component {
    render() {
        return (
          <div className="tournaments">
            <div className="tournaments__top">
              <div className="col col-left">
                <p className="title">Achievements</p>
                <p className="txt">Results will only appear if you have won on Clickfun</p>
              </div>

              <div className="col col-right">
                <p className="txt">My Tournament Winnings this week</p>
                <div className="number">0</div>
              </div>
            </div>

            <div className="tournaments__table">
              <table>
                <thead>
                  <tr>
                    <td>Tournment Name</td>
                    <td>Date</td>
                    <td>Place</td>
                    <td>Prize</td>
                  </tr>
                </thead>
              </table>
            </div>
          </div>
        );
    }
}
