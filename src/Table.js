import React, {Component} from 'react';
import PropTypes from 'prop-types';
import firstColLogo from './res/checkBoxesCol.svg';
import Checkbox from './Checkbox';
import RatingStars from './RatingStars';
import './css/Table.css';

export default class Table extends Component {
  static ASC_SORTING = 'asc';
  static DESC_SORTING = 'desc';

  static propTypes = {
    json: PropTypes.string.isRequired,
    onRatingChanged: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      parsedJSON: [],
      json: this.props.json
    };

    this.onSortByPrice = this.onSortByPrice.bind(this);
    this.onSortByName = this.onSortByName.bind(this);
    this.onSortByRating = this.onSortByRating.bind(this);
  }

  componentWillMount() {
    this.parseJSON();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ json: nextProps.json });
    setTimeout(() => this.parseJSON(), 30);
  }

  parseJSON() {
    let data = [];
    const parsedJSON = JSON.parse(this.state.json);
    for (let i = 0; i < parsedJSON.length; ++i) {
      data.push(parsedJSON[i]);
    }

    this.setState({
      parsedJSON: data
    });
  }

  renderRow() {
    return this.state.parsedJSON.map((row) => this.createRow(row));
  }

  createRow(json) {
    return (
      <tr
        key={json.id}
        type={json.type}>
        <td><Checkbox checked={false} id={`checkBoxFirstCol${json.id}`}/></td>
        <td style={ styles.productCol }>
          {json.name}
        </td>
        <td>
          <RatingStars
            value={ json.rating }
            maxRating={ 5 }
            onRatingChanged={ this.props.onRatingChanged }
            id={ json.id }
          />
        </td>
        <td>
          {json.price}
        </td>
      </tr>
    );
  }

  isSortingPossible() {
    return this.state.parsedJSON.length > 1;
  }

  onSortByPrice() {
    if (this.isSortingPossible()) {
      let array = this.state.parsedJSON;
      //If it will a first sorting or data was sorted by DESC
      if (!this.state.priceSortType || this.state.priceSortType === Table.DESC_SORTING) {
        array.sort((a, b) => {
          const firstNum = parseInt(a.price.slice(1), 10);
          const secondNum = parseInt(b.price.slice(1), 10);
          return firstNum - secondNum;
        });

        this.setState({
          priceSortType: Table.ASC_SORTING,
          parsedJSON: array
        });
      } else {
        array.sort((a, b) => {
          const firstNum = parseInt(a.price.slice(1), 10);
          const secondNum = parseInt(b.price.slice(1), 10);
          return secondNum - firstNum;
        });

        this.setState({
          priceSortType: Table.DESC_SORTING,
          parsedJSON: array
        });
      }
    }
  }

  onSortByName() {
    if (this.isSortingPossible()) {
      let array = this.state.parsedJSON;
      if (!this.state.nameSortType || this.state.nameSortType === Table.DESC_SORTING) {
        array.sort((a, b) => {
          return a.name.localeCompare(b.name);
        });

        this.setState({
          nameSortType: Table.ASC_SORTING,
          parsedJSON: array
        });
      } else {
        array.sort((a, b) => {
          return a.name.localeCompare(b.name) * -1;
        });

        this.setState({
          nameSortType: Table.DESC_SORTING,
          parsedJSON: array
        });
      }
    }
  }

  onSortByRating() {
    if (this.isSortingPossible()) {
      let array = this.state.parsedJSON;
      if (!this.state.ratingSortType || this.state.ratingSortType === Table.DESC_SORTING) {
        array.sort((a, b) => {
          const firstNum = parseFloat(a.rating);
          const secondNum = parseFloat(b.rating);
          return firstNum - secondNum;
        });

        this.setState({
          ratingSortType: Table.ASC_SORTING,
          parsedJSON: array
        });
      } else {
        array.sort((a, b) => {
          const firstNum = parseFloat(a.rating);
          const secondNum = parseFloat(b.rating);
          return secondNum - firstNum;
        });

        this.setState({
          ratingSortType: Table.DESC_SORTING,
          parsedJSON: array
        });
      }
    }
  }

  render() {
    return (
      <div id='table' className={'radius'}>
        <table>
          <thead>
            <tr>
              <th style={styles.checkboxCol}>
                <img src={firstColLogo} alt='logo'/>
              </th>
              <th style={styles.productCol} onClick={this.onSortByName}>Product name</th>
              <th onClick={this.onSortByRating}>Rating</th>
              <th onClick={this.onSortByPrice}>Price</th>
            </tr>
          </thead>
          <tbody>
          {this.renderRow()}
          </tbody>
        </table>
      </div>
    );
  }
}

const styles = {
  productCol: {
    width: '376px',
    textAlign: 'left',
    paddingLeft: '20px',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    maxWidth: '376px',
    minWidth: '376px'
  },

  checkboxCol: {
    width: '54px'
  }
};