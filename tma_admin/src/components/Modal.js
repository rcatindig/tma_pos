import React, { Component, Fragment } from 'react';


class Modal extends Component {

    static defaultProps = {
        title: "Modal Title",
        className: "",
        size: "medium"
    };

    renderBackdrop = (show) => {

        
        document.getElementById("modal-backdrop").style.display = show ? "block" : "none";
        
    }

    render() {

        const { title, children, className, show, handleCloseClick, size } = this.props;

        var modalSize = "modal-md";
        switch(size)
        {
            case "small": 
                modalSize = "modal-sm";
                break;
            case "medium": 
                modalSize = "modal-md";
                break;
            case "large":
                modalSize = "modal-lg";
                break;
            default:
                modalSize = "modal-md";
                break;

        }

        
        // this.renderBackdrop(show);

        // console.log(show);
        
        return(
            <Fragment>
            <div className="modal-dim" style={{display: show ? "block": "none"}}>
                <div className="modal in" id="static-labels-Modal" role="dialog" style={{display: "block"}} >
                    <div className={`modal-dialog ${modalSize}`} role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleCloseClick}>
                                    <span aria-hidden="true">×</span>
                                </button>
                                <h5 className="modal-title">{title}</h5>
                            </div>

                            {children}

                        </div>

                    </div>

                </div>
            </div>
            

            {/* {this.renderBackdrop(show)} */}

            {/* <div className="modal-backdrop fade in" style={{display : show ? "block" : "none"}}></div> */}
            </Fragment>
            // <div className={ show ? "ui dimmer modals page transition visible active" : "ui dimmer modals page transition  hidden" }>
            //     <div className={"modal " + className} tabIndex="-1" role="dialog" style={{display: show ? 'block': 'none' }}>
            //         <div className={"modal-dialog " + modalSize} role="document">
            //             <div className="modal-content">
            //                 <div className="modal-header">
            //                     <h5 className="modal-title">{title}</h5>
            //                     <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleCloseClick}>
            //                     <span aria-hidden="true">&times;</span>
            //                     </button>
            //                 </div>
            //                 {children}
            //             </div>
            //         </div>
            //     </div>
            // </div>
            
        );
    }

}

export { Modal };