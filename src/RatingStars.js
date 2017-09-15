import React from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
import './css/Rating.css';

export default class RatingStars extends React.Component {
  static propTypes = {
    value: PropTypes.number.isRequired,
    maxRating: PropTypes.number.isRequired,
    onRatingChanged: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired
  };

  constructor(props) {
    super(props);

    this.ratingWidth = this.calculateRatingFill(this.optimizeInputValue());

    this.onRatingChanged = this.onRatingChanged.bind(this);
    this.onRatingWithChanged = this.onRatingWithChanged.bind(this);
  }

  componentDidMount() {
    setTimeout(() => this.ratingMinXValue = $('.live')[0].getBoundingClientRect().left, 10);
  }

  onRatingChanged(event) {
    event.stopPropagation();
    $(`#ratingWidth${this.props.id}`).css('width', `${this.ratingWidth}%`);
    const id = $(event.currentTarget).attr('id');
    const rating = this.calculateRatingValue(this.ratingWidth);

    this.props.onRatingChanged(parseInt(id.slice(-1), 10), rating);
  }

  calculateRatingFill(value) {
    const maxRating = this.props.maxRating;
    return (value / maxRating) * 100;
  }

  calculateRatingValue(percent) {
    const maxRating = this.props.maxRating;
    const value = parseFloat(((percent * maxRating) / 100).toFixed(2)) + 1;
    return value <= this.props.maxRating ? value : this.props.maxRating;
  }

  onRatingWithChanged(event) {
    event.stopPropagation();
    const value = event.nativeEvent.clientX - this.ratingMinXValue;
    this.ratingWidth = value > 100 ? 100 : value;
  }

  optimizeInputValue() {
    if (this.props.value < 1) return 0;
    else if (this.props.value < this.props.maxRating) return this.props.value - 1;
    else return this.props.maxRating;
  }

  render() {
    return(
      <div
        id={`rating${this.props.id}`}
        style={styles.ratingWrap}
        className="rating"
        onClick={this.onRatingChanged}
      >
        <div className="stars">
          <div
            className="on"
            id={`ratingWidth${this.props.id}`}
            style={{ width: `${this.ratingWidth}%` }}
          />
          <div
            className="live"
            onMouseEnter={ this.onRatingWithChanged }
            onMouseMove={ this.onRatingWithChanged }
          >
            <span data-rate="1"/>
            <span data-rate="2"/>
            <span data-rate="3"/>
            <span data-rate="4"/>
            <span data-rate="5"/>
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  ratingWrap: {
    marginLeft: '19px'
  }
};