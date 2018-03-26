import React, { Component } from 'react';


class Modal extends Component {

    static defaultProps = {
        title: "Modal Title",
        className: "",
    };

    constructor(props) {
        super(props);
    }

    render() {

        const { title, children, className, show, handleCloseClick } = this.props;

        return(
            <div className={ show ? "ui dimmer modals page transition visible active" : "ui dimmer modals page transition  hidden" }>
                <div className={"modal " + className} tabIndex="-1" role="dialog" style={{display: show ? 'block': 'none' }}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{title}</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleCloseClick}>
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            {children}
                        </div>
                    </div>
                </div>
            </div>
            
        );
    }

}

export { Modal };