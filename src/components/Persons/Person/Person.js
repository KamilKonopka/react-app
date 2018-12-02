import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styling from './Person.css'
import WithClass from '../../../hoc/WithClass';

class Person extends Component {

    constructor(props) {
        super(props);
        console.log('[Person.js] Inside Constructor', props);
      }
    
      componentWillMount() {
        console.log('Person.js] Inside componentWillMount()');
      }
    
      componentDidMount() {
        console.log('Person.js] Inside componentDidMount()');
        if(this.props.position === 0) this.inputElement.focus();
      }

    render() {
        return(
            <WithClass classes={styling.Person} >
                <p onClick={this.props.click}>
                    I'm a {this.props.name} and I am {this.props.age} years old!!
                </p>
                <p>{this.props.children}</p>
                <input
                    ref={(input) => { this.inputElement = input }}
                    type="text"
                    onChange={this.props.changed}
                    value={this.props.name}
                />
            </WithClass>
        );
    }
}
Person.propTypes = {
  click: PropTypes.func,
  name: PropTypes.string,
  age: PropTypes.number,
    changed: PropTypes.func
};

export default Person;