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

    return (
      <div>
        <div>
          <span>{`目前線上有: ${users}人`}</span>
        </div>
        <SeatingChart actions={actions} seats={seats} lookingIds={lookingIds}></SeatingChart>
        <div>
          <span>{`您目前選擇的座位是 ${lookingIds.join(',')}`}</span>
        </div>
        <div>
          <button className='button' onClick={this.handleOnCancel}>取消</button>
          <button className='button' onClick={this.handleOnSubmit}>確定</button>
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
