import React, { Component } from 'react';
import { arrayOf, string, shape, number, func } from 'prop-types';

import { SelectionWrapper, Select, Button } from './styles';

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
      <SelectionWrapper>
        Add more currency: 
        <Select value={selected} onChange={this.handleChange}>
          {options.map((opt) => (
            <option key={opt.code} value={opt.code}>
              {opt.code}
            </option>
          ))}
        </Select>
        <Button onClick={this.handleSubmit}>Submit</Button>
      </SelectionWrapper>
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
  onSubmit: () => {}
};

export default Selection;
