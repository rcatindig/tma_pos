import React, {Component} from 'react';


class MdInput extends Component {

    constructor(props) 
    {
        super(props);

    }

    static defaultProps = {
        value: "",
        label: "Label",
        type: "text"
    };

    render () {

        const { value, onChange, label, type } = this.props;

        

        return (
            <div className="md-input-wrapper"><input type={type}
                    className={`md-form-control ${value !== "" ? "md-valid" : ""}`}
                    value={value}
                    onChange={onChange}
                    /><label>{label}</label><span className="md-line"></span></div>
        );
    }
}

export { MdInput };