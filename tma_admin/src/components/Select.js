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
        const { id, className, options, name, value, onChange, placeholder } = this.props;
        return (
            <select 
                className={className}
                id={id} 
                name={name} 
                value={value} 
                onChange={onChange}>

                    <option>{placeholder}</option>
                    {options.map(function(a) {
                        return (
                            <option key={a.value} value={a.value}>{a.label}</option>
                        );
                    })}

            </select>
        );
    }

}

export { Select };