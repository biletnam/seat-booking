import './app.styl';
import { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './actions';
import SeatingChart from './components/seating-chart';

class App extends Component {
  handleOnCancel = e => {
    // this.props.actions.select(id);
  }

  handleOnSubmit = e => {
    this.props.actions.booking();
  }

  render() {
    const users = this.props.space.users,
          lookingIds = this.props.purchase.sids,
          actions = this.props.actions,
          seats = this.props.seats;
    let message = '';
    if (lookingIds.length) {
      message = `You select seats: ${lookingIds.join(', ')}`;
    } else {
      message = 'You not yet select your seats.';
    }
    return (
      <div>
        <div className='strong-line'>
          <span>{`Online Users: ${users}`}</span>
        </div>
        <SeatingChart actions={actions} seats={seats} lookingIds={lookingIds}></SeatingChart>
        <div className='strong-line'>
          <span>{message}</span>
        </div>
        <div>
          <button className='button' onClick={this.handleOnCancel}>Cancel</button>
          <button className='button button--danger' onClick={this.handleOnSubmit}>Submit</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { ...state };
};

const mapDispatchToProps = dispatch => {
  return { actions: bindActionCreators(actions, dispatch) };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
