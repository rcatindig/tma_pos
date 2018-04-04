import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import Moment from 'moment';


class DateSelect extends Component {

    static defaultProps = {
        id: "date",
        className: "",
        selected: Moment(),
    }
    render () {
        const { id, className, selected, onChange } = this.props;
        return (
            <div className="date-container">
                <DatePicker
                    id={id}
                    className="form-control"
                    onChange={onChange}
                    selected={selected}
                />
            </div>
        );
    }
}

export { DateSelect };