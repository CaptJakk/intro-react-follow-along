import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setSearchTerm } from './actionCreators';
const { func, object, string } = React.PropTypes;

const Landing = React.createClass({
  contextTypes: {
    router: object
  },
  propTypes: {
    searchTerm: string,
    dispatchSetSearchTerm: func
  },
  handleSearchTermChange (event) {
    this.props.dispatchSetSearchTerm(event.target.value);
  },
  handleSearchSubmit (event) {
    event.preventDefault();
    this.context.router.push('/search');
  },
  handleBrowseAll (event) {
    this.props.dispatchSetSearchTerm('');
  },
  render () {
    return (
      <div className='app'>
        <div className='landing'>
          <h1>svideo</h1>
          <form onSubmit={this.handleSearchSubmit}>
            <input
              onChange={this.handleSearchTermChange}
              value={this.props.searchTerm}
              type='text'
              placeholder='Search'
            />
          </form>
          <Link onClick={this.handleBrowseAll} to='/search'>or Browse All</Link>
        </div>
      </div>
    );
  }
});

const mapStateToProps = (state) => {
  return {
    searchTerm: state.searchTerm
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchSetSearchTerm (searchTerm) {
      dispatch(setSearchTerm(searchTerm));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
