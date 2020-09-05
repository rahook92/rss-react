import React, { Component } from 'react';
import classes from './Filters.css';

class Filters extends Component {
    constructor(props){
        super(props);

        this.state = {
            value: 'All'
        }
    

    }

    handleChange = (event) => {
        this.setState({ value: event.target.value }, () => {
            this.props.getRecent(this.state.value);
        })
    }

    render(){
        return (
            <div>
                <div className={classes.Dropdown}>
                    <label htmlFor='category'>Category</label>
        
                    <select value={this.state.value} onChange={this.handleChange} name='category' id='category'>
                        <option value='All' name='All'>All</option>
                        <option value='Politics' name='Politics'>Politics</option>
                        <option value='Sports'>Sports</option>
                        <option value='Culture'>Culture</option>
                        <option value='Science'>Science</option>
                        <option value='Business'>Business</option>
                        <option value='Music'>Music</option>
                    </select>
                </div>
            </div>
        )
    }
}

export default Filters;