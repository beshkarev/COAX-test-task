import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './css/Checkbox.css';

export default class Checkbox extends Component {
  static propTypes = {
    checked: PropTypes.bool.isRequired,
    label: PropTypes.string,
    id: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    type: PropTypes.string
  };

  constructor(props) {
    super(props);

    this.state = {
      isChecked: this.props.checked
    };

    this.toggleCheckBox = this.toggleCheckBox.bind(this);
  }

  toggleCheckBox() {
    if (this.props.onClick) this.props.onClick(!this.state.isChecked, this.props.type);

    this.setState({
      isChecked: !this.state.isChecked
    });
  }

  render() {
    return(
      <section>
        <div className="checkbox">
          <input type="checkbox" id={this.props.id} checked={this.state.isChecked} onChange={ this.toggleCheckBox } />
          <label htmlFor={this.props.id} />
        </div>
        {this.props.label &&
          <div style={styles.labelStyle}>
            {this.props.label}
          </div>
        }
      </section>
    );
  }
}

const styles = {
  labelStyle: {
    display: 'inline-block',
    marginLeft: '10px',
    opacity: '0.8'
  }
};