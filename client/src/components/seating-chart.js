import './seating-chart.styl';
import { Component, PropTypes } from 'react';

export default class SeatingChart extends Component {
  handleClick = e => {
    const id = e.currentTarget.dataset.value;
    this.props.actions.looking(id);
  }

  render() {
    const seats = this.props.seats || [],
          lookingIds = this.props.lookingIds,
          sids = seats.map(s => s.id.split('-')),
          seatMap = [];
    sids.forEach((coordinate, i) => {
      const x = coordinate[0],
            y = coordinate[1];
      seatMap[x] = seatMap[x] || [];
      seatMap[x][y] = seats[i];
    });

    return (
      <div>
        {seatMap.map((cx, i) => {
          return (
            <div key={i}>
              {cx.map(cy => {
                return <span
                  key={cy.id}
                  className={classnames('seat', {
                    'seat--looking': lookingIds.indexOf(cy.id) > -1,
                    'seat--closed': cy.bookingBy,
                    'seat--user-looking': cy.lookingBy.length > 0
                  })}
                  data-value={cy.id}
                  onClick={this.handleClick}
                >{cy.id}</span>;
              })}
            </div>
          );
        })}
      </div>
    );
  }
}
