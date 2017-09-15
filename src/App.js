import React, {Component} from 'react';
import Table from './Table';
import Checkbox from './Checkbox';

export default class App extends Component {
  static CATEGORY_NOTEBOOK = 'notebook';
  static CATEGORY_TABLET = 'tablet';
  static CATEGORY_PHONE = 'phone';

  constructor(props) {
    super(props);

    this.state = {
      jsonForTable: []
    };

    this.selectedCategoty = [App.CATEGORY_NOTEBOOK];

    this.onCheckboxClick = this.onCheckboxClick.bind(this);
    this.onRatingChanged = this.onRatingChanged.bind(this);
  }

  componentWillMount() {
    this.json = [{
      id: 1,
      type: "phone",
      name: "iPhone 5",
      price: "$400",
      rating: 3.8
    }, {
      id: 2,
      type: "phone",
      name: "Nokia Lumia 1320",
      price: "$130",
      rating: 2.1
    }, {
      id: 3,
      type: "notebook",
      name: "Dell Inspiron 15 7567",
      price: "$1000",
      rating: 4.5
    }, {
      id: 4,
      type: "notebook",
      name: "Asus ZenBook UX510UW",
      price: "$1200",
      rating: 4.7
    }, {
      id: 5,
      type: "tablet",
      name: "Samsung Galaxy Tab S2 VE 9.7 3G 32GB",
      price: "$520",
      rating: 5
    }, {
      id: 6,
      type: "tablet",
      name: "BRAVIS NP747 SD",
      price: "$200",
      rating: 3.5
    }];

    setTimeout(() => {
      this.prepareJSONForTable();
    }, 10);
  }

  onCheckboxClick(checked, type) {
    if (checked) {
      this.selectedCategoty.push(type);
    } else {
      const index = this.selectedCategoty.findIndex((item) => { return item === type });
      if (index !== -1) this.selectedCategoty.splice(index, 1);
    }

    this.prepareJSONForTable();
  }

  prepareJSONForTable() {
    const filteredPosition = this.json.filter((item) => {
      return this.isCategorySelected(item.type);
    });

    this.setState(() => {
      return {jsonForTable: filteredPosition}
    });
  }

  isCategorySelected(type) {
    return this.selectedCategoty.findIndex((category) => { return category === type }) !== -1;
  }

  onRatingChanged(id, rating) {
    for (let i = 0; i < this.json.length; ++i) {
      if (this.json[i].id === id) {
        this.json[i].rating = rating;
        break;
      }
    }
  }

  render() {
    return (
      <div>
        <div style={ styles.wrapCheckboxes }>
          <div style={ styles.checkBoxWrap }>
            <Checkbox
              checked={ this.isCategorySelected(App.CATEGORY_NOTEBOOK) }
              label={ 'Notebooks' }
              id={ 'checkboxInput1' }
              type={ App.CATEGORY_NOTEBOOK }
              onClick={ this.onCheckboxClick }
            />
          </div>
          <div style={ styles.checkBoxWrap }>
            <Checkbox
              checked={ this.isCategorySelected(App.CATEGORY_TABLET) }
              label={ 'Tablets' }
              id={ 'checkboxInput2' }
              type={ App.CATEGORY_TABLET }
              onClick={ this.onCheckboxClick }
            />
          </div>
          <div style={ styles.checkBoxWrap }>
            <Checkbox
              checked={ this.isCategorySelected(App.CATEGORY_PHONE) }
              label={ 'Mobile phones' }
              id={ 'checkboxInput3' }
              type={ App.CATEGORY_PHONE }
              onClick={ this.onCheckboxClick }
            />
          </div>
        </div>
        <div style={ styles.wrapTable }>
          <Table
            json={JSON.stringify(this.state.jsonForTable)}
            onRatingChanged={ this.onRatingChanged }
          />
        </div>
      </div>
    );
  }
}

const styles = {
  checkBoxWrap: {
    marginBottom: 20
  },
  wrapCheckboxes: {
    marginTop: '200px',
    width: '200px',
    marginLeft: '80px'
  },
  wrapTable: {
    position: 'relative',
    top: '-130px',
    marginLeft: '280px'
  }
};

