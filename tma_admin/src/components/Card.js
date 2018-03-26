import React, { Component } from 'react';

class Card extends Component {
    static defaultProps = {
        otherClass: "",
        title: "",
        subTitle: ""
    };
  
    constructor(props) {
      super(props);
    }

    renderContent() {
        const { title, subTitle, children } = this.props;

        if(title !== "" || subTitle !== "")
        {
            return (
                <div className="card-body">
                    <h4 className="card-title">{ title }</h4>
                    <h6 className="card-subtitle">{ subTitle }</h6>
                    {children}
                </div>
            );
        } else {
            return children;
        }
            
        
    }
    
    render () {
        
        const { otherClass, children } = this.props;

        return(
            <div className={"card " + otherClass}>
                {this.renderContent()}
            </div>
        );
    }
}

export { Card };