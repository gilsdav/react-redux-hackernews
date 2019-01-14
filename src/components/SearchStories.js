import React, { Component } from 'react';
import { connect } from 'react-redux';
import { doFetchStories } from '../actions/story';
import Button from './Button';
import {
  getReadableStories
} from '../selectors/story';

import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

const applyQueryState = query => () => ({
  query
});

class SearchStories extends Component {

  locationChangeListener;

  constructor(props) {
    super(props);

    this.state = {
      query: '',
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }


  componentWillMount() {
    this.locationChangeListener = history.listen((location, action) => {
      console.log(`The current URL is ${location.pathname}${location.search}${location.hash}`);
      console.log(`The last navigation action was ${action}`);
    });

    const params = new URLSearchParams(history.location.search);
    const searchParam = params.get('search');
    if (searchParam && this.props.stories.length === 0) {
      this.props.onFetchStories(searchParam);
    }

  }

  componentWillUnmount() {
    this.locationChangeListener();
  }


  onSubmit(event) {
    const { query } = this.state;
    if (query) {
      this.props.onFetchStories(query);
      history.push({
        pathname: '/',
        search: `?search=${query}`
      });
      this.setState(applyQueryState(''));
    }

    event.preventDefault();
  }

  onChange(event) {
    const { value } = event.target;
    this.setState(applyQueryState(value));
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input
          type="text"
          value={this.state.query}
          onChange={this.onChange}
        />
        <Button type="submit">
          Search
        </Button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  onFetchStories: query => dispatch(doFetchStories(query)),
});

const mapStateToProps = state => ({
  stories: getReadableStories(state),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchStories);