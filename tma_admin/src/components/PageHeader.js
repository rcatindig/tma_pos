import React, { Component } from 'react';


class PageHeader extends Component {

    static defaultProps = {
        title: ""
    };

    render () {

        const { title } = this.props;

        return (

            <div className="row">
                <div className="col-sm-12 p-0">
                    <div className="main-header">
                        <h4>{title}</h4>
                        <ol className="breadcrumb breadcrumb-title breadcrumb-arrow">
                            <li className="breadcrumb-item">
                            <a href="index.html">
                                <i className="icofont icofont-home"></i>
                            </a>
                            </li>
                            <li className="breadcrumb-item"><a href="#">{title}</a>
                            </li>
                        </ol>
                    </div>
                </div>
            </div>
            
        );
    }
}

export { PageHeader };