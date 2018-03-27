import React, { Component } from 'react';

class Select extends Component {

    static defaultProps = {
        className: "",
        id:"",
        options: [],
        name: ""
    };
  
    constructor(props) {
        super(props);
    }

    
    render() {
        const { id, className, options, name } = this.props;
        console.log(options);
        return (
            <select className={className} id={id} name={name}>
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