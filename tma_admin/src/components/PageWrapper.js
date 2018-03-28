import React, { Component } from 'react';

class PageWrapper extends Component {

    render() {
        return (
            <div className="page-wrapper">
                { this.props.children }
                <footer className="footer"> © 2018 All rights reserved. Powered by <a href="http://www.tmatech.com.au">TMA Tech</a></footer>
            </div>
        );
    }
}

export { PageWrapper }; 