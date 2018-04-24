import React, {Component} from 'react';

import AuthService from '../utils/AuthService';
import classie from 'classie';



class Header extends Component {

    constructor(props)
    {
        super(props);

        this.AuthService = new AuthService();

        this.logout = this.AuthService.logout;
        this.profile = this.AuthService.getProfile();
    }

    componentDidMount() {
        var isAnimating;
        var morphSearch = document.getElementById('morphsearch'),
            input = morphSearch.querySelector('input.morphsearch-input'),
            ctrlClose = morphSearch.querySelector('span.morphsearch-close'),
            isOpen = isAnimating = false,
            isHideAnimate = morphSearch.querySelector('.morphsearch-form'),
            // show/hide search area
            toggleSearch = function(evt) {
                // return if open and the input gets focused
                if (evt.type.toLowerCase() === 'focus' && isOpen) return false;

                var offsets = morphSearch.getBoundingClientRect();
                if (isOpen) {
                    classie.remove(morphSearch, 'open');

                    // trick to hide input text once the search overlay closes
                    // todo: hardcoded times, should be done after transition ends
                    //if( input.value !== '' ) {
                    setTimeout(function() {
                        classie.add(morphSearch, 'hideInput');
                        setTimeout(function() {
                            classie.add(isHideAnimate, 'p-absolute');
                            classie.remove(morphSearch, 'hideInput');
                            input.value = '';
                        }, 300);
                    }, 500);
                    //}

                    input.blur();
                } else {
                    classie.remove(isHideAnimate, 'p-absolute');
                    classie.add(morphSearch, 'open');
                }
                isOpen = !isOpen;
            };

        // events
        input.addEventListener('focus', toggleSearch);
        ctrlClose.addEventListener('click', toggleSearch);
        // esc key closes search overlay
        // keyboard navigation events
        document.addEventListener('keydown', function(ev) {
            var keyCode = ev.keyCode || ev.which;
            if (keyCode === 27 && isOpen) {
                toggleSearch(ev);
            }
        });
        var morphSearch_search = document.getElementById('morphsearch-search');
        morphSearch_search.addEventListener('click', toggleSearch);

        /***** for demo purposes only: don't allow to submit the form *****/
        morphSearch.querySelector('button[type="submit"]').addEventListener('click', function(ev) {
            ev.preventDefault();
        });
    }

    onClickLogout = () => {
        this.logout();
        window.location.replace('#/login');
    }
 
    render() {
        const { first_name, surname } = this.profile;
        return (
            <header className="main-header-top hidden-print">
                <a href="index.html" className="logo">
                    <img className="img-fluid able-logo" src="assets/images/tma-logo-white.png" alt="Theme-logo" />
                </a>
                <nav className="navbar navbar-static-top">
                    <a data-toggle="offcanvas" className="sidebar-toggle"></a>
                    <div className="navbar-custom-menu f-right">
                        <ul className="top-nav">

                            <li className="dropdown pc-rheader-submenu message-notification search-toggle">
                                <a  id="morphsearch-search" className="drop icon-circle txt-white">
                                    <i className="icofont icofont-search-alt-1"></i>
                                </a>
                            </li>
                            <li className="dropdown notification-menu">
                                <a href="#!" data-toggle="dropdown" aria-expanded="false" className="dropdown-toggle">
                                    <i className="icon-bell"></i>
                                    <span className="badge badge-danger header-badge">9</span>
                                </a>
                                <ul className="dropdown-menu">
                                    <li className="not-head">You have
                                        <b className="text-primary">4</b> new notifications.</li>
                                    <li className="bell-notification">
                                        <a href="javascript:;" className="media">
                                            <span className="media-left media-icon">
                                                <img className="img-circle" src="assets/images/avatar-1.png" alt="User Image" />
                                            </span>
                                            <div className="media-body">
                                                <span className="block">Lisa sent you a mail</span>
                                                <span className="text-muted block-time">2min ago</span>
                                            </div>
                                        </a>
                                    </li>
                                    <li className="bell-notification">
                                        <a href="javascript:;" className="media">
                                            <span className="media-left media-icon">
                                                <img className="img-circle" src="assets/images/avatar-2.png" alt="User Image" />
                                            </span>
                                            <div className="media-body">
                                                <span className="block">Server Not Working</span>
                                                <span className="text-muted block-time">20min ago</span>
                                            </div>
                                        </a>
                                    </li>
                                    <li className="bell-notification">
                                        <a href="javascript:;" className="media">
                                            <span className="media-left media-icon">
                                                <img className="img-circle" src="assets/images/avatar-3.png" alt="User Image" />
                                            </span>
                                            <div className="media-body">
                                                <span className="block">Transaction xyz complete</span>
                                                <span className="text-muted block-time">3 hours ago</span>
                                            </div>
                                        </a>
                                    </li>
                                    <li className="not-footer">
                                        <a href="#!">See all notifications.</a>
                                    </li>
                                </ul>
                            </li>
                            <li className="pc-rheader-submenu ">
                                <a href="#!" className="drop icon-circle displayChatbox">
                                    <i className="icon-bubbles"></i>
                                    <span className="badge badge-danger header-badge blink">5</span>
                                </a>

                            </li>
                            <li className="dropdown">
                                <a href="#!" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false" className="dropdown-toggle drop icon-circle drop-image">
                                    <span>
                                        <img className="img-circle " src="assets/images/avatar-1.png" style={{width:"40px"}} alt="User Image" />
                                    </span>
                                    <span>{first_name}
                                        <b>{surname}</b>
                                        <i className=" icofont icofont-simple-down"></i>
                                    </span>

                                </a>
                                <ul className="dropdown-menu settings-menu">
                                    <li>
                                        <a href="#!">
                                            <i className="icon-settings"></i> Settings</a>
                                    </li>
                                    <li>
                                        <a href="profile.html">
                                            <i className="icon-user"></i> Profile</a>
                                    </li>
                                    <li>
                                        <a href="message.html">
                                            <i className="icon-envelope-open"></i> My Messages</a>
                                    </li>
                                    <li className="p-0">
                                        <div className="dropdown-divider m-0"></div>
                                    </li>
                                    <li>
                                        <a href="lock-screen.html">
                                            <i className="icon-lock"></i> Lock Screen</a>
                                    </li>
                                    <li>
                                        <a onClick={() => this.onClickLogout()}>
                                            <i className="icon-logout"></i> Logout</a>
                                    </li>

                                </ul>
                            </li>
                        </ul>
                        <div id="morphsearch" className="morphsearch">
                            <form className="morphsearch-form">

                                <input className="morphsearch-input" type="search" placeholder="Search..." />

                                <button className="morphsearch-submit" type="submit">Search</button>

                            </form>
                            <div className="morphsearch-content">
                                <div className="dummy-column">
                                    <h2>People</h2>
                                    <a className="dummy-media-object" href="#!">
                                        <img className="round" src="http://0.gravatar.com/avatar/81b58502541f9445253f30497e53c280?s=50&d=identicon&r=G" alt="Sara Soueidan"
                                        />
                                        <h3>Sara Soueidan</h3>
                                    </a>

                                    <a className="dummy-media-object" href="#!">
                                        <img className="round" src="http://1.gravatar.com/avatar/9bc7250110c667cd35c0826059b81b75?s=50&d=identicon&r=G" alt="Shaun Dona"
                                        />
                                        <h3>Shaun Dona</h3>
                                    </a>
                                </div>
                                <div className="dummy-column">
                                    <h2>Popular</h2>
                                    <a className="dummy-media-object" href="#!">
                                        <img src="assets/images/avatar-1.png" alt="PagePreloadingEffect" />
                                        <h3>Page Preloading Effect</h3>
                                    </a>

                                    <a className="dummy-media-object" href="#!">
                                        <img src="assets/images/avatar-1.png" alt="DraggableDualViewSlideshow" />
                                        <h3>Draggable Dual-View Slideshow</h3>
                                    </a>
                                </div>
                                <div className="dummy-column">
                                    <h2>Recent</h2>
                                    <a className="dummy-media-object" href="#!">
                                        <img src="assets/images/avatar-1.png" alt="TooltipStylesInspiration" />
                                        <h3>Tooltip Styles Inspiration</h3>
                                    </a>
                                    <a className="dummy-media-object" href="#!">
                                        <img src="assets/images/avatar-1.png" alt="NotificationStyles" />
                                        <h3>Notification Styles Inspiration</h3>
                                    </a>
                                </div>
                            </div>
                            <span className="morphsearch-close">
                                <i className="icofont icofont-search-alt-1"></i>
                            </span>
                        </div>
                    </div>
                </nav>
            </header>
        );
    }
}

export {Header};