import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import Moment from 'moment';

import PropTypes from 'prop-types';



class CustomInput extends Component {

    static defaultProps = {
        id: "date",
        className: "",
        selected: Moment(),
        
    }
    render () {
        const { id, className, selected, onChange, name, value } = this.props;
        console.log(this.props);
        return (
            <div className="md-input-wrapper"><input type="text" 
                    className={`md-form-control ${value !== "" ? "md-valid" : ""}`}
                    value={this.props.value}
                    onClick={this.props.onClick}
                    onChange={onChange}
                    /><label>{name}</label><span className="md-line"></span></div>
            
        );
    }
    
}

CustomInput.propTypes = {
    onClick: PropTypes.func,
    onChange: PropTypes.func,
    value: PropTypes.string,
    name: PropTypes.string
};


class DateSelect extends Component {
    static defaultProps = {
        id: "date",
        className: "",
        selected: Moment(),
        label: "Date",
    }

    render () {
        const { id, className, selected, onChange, label } = this.props;

        return (
            <DatePicker
                id={id}
                name={label}
                customInput={<CustomInput />}
                selected={selected}
                onChange={onChange} />
        );
    }
}



export { DateSelect };