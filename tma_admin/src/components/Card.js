import React, { Component } from 'react';

class Card extends Component {
    static defaultProps = {
        otherClass: "",
        title: "",
        subTitle: "",
        buttons: [],
    };

    

    renderHeaderWrapper = () => {

        const { title, subTitle, buttons } = this.props;

        if(buttons.length > 0)
        {
            return (
                    <div className="row">
                        <div className="col-md-7">
                            <h4 className="card-title">{ title }</h4>
                            <h6 className="card-subtitle">{ subTitle }</h6>
                        </div>
                        <div className="col-md-5">
                        {buttons.map(function(a) {
                            return (
                                <button key={a.id} className={a.class} onClick={a.onClick}>{a.title}</button>
                            );
                        })}
                        </div>
                    </div>
                    
            );
        } else {

            return (
                <div>     
                    <h4 className="card-title">{ title }</h4>
                    <h6 className="card-subtitle">{ subTitle }</h6>
                </div>
            );
            
        }
        
        
    }

    renderContent() {
        const { title, subTitle, children } = this.props;

        if(title !== "" || subTitle !== "")
        {
            //this.renderWrapper();
            return (
                <div className="card-body">

                        { this.renderHeaderWrapper() }
                    
                        {/* <h4 className="card-title">{ title }</h4>
                        <h6 className="card-subtitle">{ subTitle }</h6> */}
                    
                    {children}
                </div>
            );
        } else {
            return children;
        }
            
        
    }
    
    render () {
        
        const { otherClass } = this.props;

        return(
            <div className={"card " + otherClass}>
                {this.renderContent()}
            </div>
        );
    }
}

export { Card };