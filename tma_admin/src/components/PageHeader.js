import React, { Component } from 'react';


class PageHeader extends Component {

    static defaultProps = {
        title: ""
    };

    render () {

        const { title } = this.props;

        return (
            <div className="row page-titles">
                <div className="col-md-5 align-self-center">
                    <h3 className="text-primary">{title}</h3> </div>
                <div className="col-md-7 align-self-center">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="javascript:void(0)">Home</a></li>
                        <li className="breadcrumb-item active">{title}</li>
                    </ol>
                </div>
            </div>
        );
    }
}

export { PageHeader };