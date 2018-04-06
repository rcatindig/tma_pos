import React, { Component } from 'react';

class Loading extends Component {

    static defaultProps = {
        title: "Loading...",
        show: false,
    };


    render () {

        const { title, show } = this.props;
        

        return (
                <div className="loading" style={{marginTop: "8px", marginBottom: "8px", "display":  (show) ? "block" : "none"}}>
                    <div className="loading-spinner">
                        <div className="wrap">
                            <i className="fa fa-cog"></i>
                            <i className="fa fa-cog"></i>
                        </div>
                    </div>

                    <div className="loading-spinner">
                        <div className="wrap">
                            <span className="glyphicon glyphicon-cog"></span>
                            <span className="glyphicon glyphicon-cog"></span>
                        </div>
                    </div>
                    <div className="loading-text">{title}</div>
                </div>
        );
        
    }
}

export { Loading };