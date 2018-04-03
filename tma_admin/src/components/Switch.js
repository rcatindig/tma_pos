import React, { Component } from 'react';

class Switch extends Component {

    constructor(props)
    {
        super(props);

        this.state = {
            timestamp: new Date()
        }
    }

    static defaultProps = {
        checked: false,
    };


    render() {
        const { checked, onChange, ref } = this.props;
        alert(checked);
        return (
            <div className="switch-container">                                    
                <label className="switch">
                    <input type="checkbox" 
                        defaultChecked={checked} 
                        ref={ref}
                        onChange={onChange} />
                    <span className="slider round"></span>
                </label>
                <label className="switch-label-right">
                    Edit Password
                </label>
                
            </div>
        );
    }

}

export { Switch };