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
        if(title !== "" || subTitle !== "")
        {
            if(buttons.length > 0)
            {
                return (

                    <div className="card-header"><h5 className="card-header-text">{ title }</h5>
                        <div className="f-right">
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

                    <div className="card-header">
                        <h5 className="card-header-text">{ title }</h5>
                    </div>
                );
                
            }
        }

        
        
        
    }

    renderContent() {
        const { title, subTitle, children } = this.props;

        if(title !== "" || subTitle !== "")
        {
            //this.renderWrapper();
            return (
                <div className="card">

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
        
        const { otherClass, children } = this.props;

        return(
            <div className={"card " + otherClass}>
                { this.renderHeaderWrapper() }
                <div className="card-block">
                    { children }
                </div>
            </div>
        );
    }
}

export { Card };