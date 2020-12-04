import React, { Component } from 'react';
import { calculateScore, generateOptions, isFormValid } from '../../utils/Utils';
import Select from '../Select/Select';
import Submit from '../Submit/Submit';
import { saveScore } from './SleepBehaviourAPI';

class SleepBehaviour extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selects: {
        bed: { label: "Duration in bed", value: "", required: true },
        asleep: { label: "Duration asleep", value: "", required: true }
      },
      options: generateOptions(0, 24),
      output: "",
      disabled: true
    }
  }

  saveScore = (score) => saveScore({ score: score }).then(response => {
    this.setState({ output: `score: ${response.data.score}` });
  }).catch(error => {
    this.setState({ output: "api error" });
  })

  handleChange = (event, key) => {
    const selects = { ...this.state.selects }
    selects[key].value = event.target.value;
    this.setState({ selects: selects, disabled: !isFormValid(selects) });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ output: "Loading" });
    const score = calculateScore(
      parseFloat(this.state.selects.bed.value),
      parseFloat(this.state.selects.asleep.value));
    this.saveScore(score);
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        {Object.entries(this.state.selects).map(([key, select]) => (
          <Select
            key={key}
            label={select.label}
            value={select.value}
            required={select.required}
            options={this.state.options}
            changed={(event) => this.handleChange(event, key)} />
        ))}
        <Submit value="Calculate" disabled={this.state.disabled} />
        <p>{this.state.output}</p>
      </form>
    )
  }
}

export default SleepBehaviour;