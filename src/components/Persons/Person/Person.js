import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {AuthContext} from "../../../containers/App";

import styling from './Person.css'
import WithClass from '../../../hoc/WithClass';

class Person extends Component {

    constructor(props) {
        super(props);
        console.log('[Person.js] Inside Constructor', props);
        this.inputElement = React.createRef();
      }
    
      componentWillMount() {
        console.log('Person.js] Inside componentWillMount()');
      }
    
      componentDidMount() {
        console.log('Person.js] Inside componentDidMount()');
        // this.focusInput();
      }
      focusInput() {
          if(this.props.position === 0) this.inputElement.current.focus();
      }

    render() {
        return(
            <WithClass classes={styling.Person} >
                <AuthContext.Consumer>
                    {auth => auth ? <p>I'm authenticated</p> : null}
                </AuthContext.Consumer>
                <p onClick={this.props.click}>
                    I'm a {this.props.name} and I am {this.props.age} years old!!
                </p>
                <p>{this.props.children}</p>
                <input
                    ref={this.inputElement}
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