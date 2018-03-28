import React, { Component } from 'react';

class Select extends Component {

    static defaultProps = {
        className: "",
        id:"",
        options: [],
        name: "",
        value: "",
    };
  
    constructor(props) {
        super(props);
    }

    
    render() {
        const { id, className, options, name, value } = this.props;
        return (
            <select className={className} id={id} name={name} value={value}>
                <option>Please select...</option>
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