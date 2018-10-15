import React, { Component } from 'react';
import { arrayOf, string, shape, number, func } from 'prop-types';

class Selection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: props.options[0].code
    };
  }

  handleChange = ({ target }) => {
    const { selected } = this.state;

    if (target.value !== selected) {
      this.setState({ selected: target.value });
    }
  };

  handleSubmit = () => {
    const { selected } = this.state;
    const { onSubmit } = this.props;

    onSubmit(selected);
  };

  render() {
    const { options } = this.props;
    const { selected } = this.state;

    return (
      <div>
        <select value={selected} onChange={this.handleChange}>
          {options.map((opt) => (
            <option key={opt.code} value={opt.code}>{opt.code}</option>
          ))}
        </select>
        <button type="submit" onClick={this.handleSubmit} />
      </div>
    );
  }
}

Selection.propTypes = {
  onSubmit: func,
  options: arrayOf(
    shape({
      code: string,
      value: number
    })
  ).isRequired
};

Selection.defaultProps = {
  onSubmit: () => {},
};

export default Selection;
