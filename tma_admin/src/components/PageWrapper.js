import React, { Component } from 'react';

class PageWrapper extends Component {

    render() {
        return (

            <div className="content-wrapper">
                <div className="container-fluid">                    
                    { this.props.children }
                </div>
            </div>
            
        );
    }
}

export { PageWrapper }; 