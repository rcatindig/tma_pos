import React, {Component} from 'react';


class MdInput extends Component {

    constructor(props) 
    {
        super(props);

    }

    static defaultProps = {
        value: "",
        label: "Label"
    };

    render () {

        const { value, onChange, label } = this.props;

        

        return (
            <div className="md-input-wrapper"><input type="text" 
                    className={`md-form-control ${value !== "" ? "md-valid" : ""}`}
                    value={value}
                    onChange={onChange}
                    /><label>{label}</label><span className="md-line"></span></div>
        );
    }
}

export { MdInput };