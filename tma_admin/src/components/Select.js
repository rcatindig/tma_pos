import React, { Component } from 'react';

class Select extends Component {

    static defaultProps = {
        className: "",
        id:"",
        options: [],
        name: "",
        value: "",
        placeholder: "Please select...",
    };

    
    render() {
        const { id, className, options, name, value, onChange, label } = this.props;
        return (

            <div className="md-input-wrapper" >
                <select id={id} className={`md-form-control ${value !== "" ? "md-valid" : ""}`} value={value} onChange={onChange}>
                    <option value=""></option>
                    {options.map(function(a) {
                        return (
                            <option key={a.value} value={a.value}>{a.label}</option>
                        );
                    })}
                </select><label>{label}</label>
            <span className="md-line"></span></div>
        );
    }

}

export { Select };