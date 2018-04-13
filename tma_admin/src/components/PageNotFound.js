import React, { Component } from 'react';


class PageNotFound extends Component {
    render () {
        return (
            <div className="error-page" id="wrapper">
                <div className="error-box">
                    <div className="error-body text-center">
                        <h1>403</h1>
                        <h3 className="text-uppercase">Forbidden Error</h3>
                        <p className="text-muted m-t-30 m-b-30">Please try after some time</p>
                        </div>
                    <footer className="footer text-center">© 2018 TMA Tech.</footer>
                </div>
            </div>
        );
    }
}

export { PageNotFound };