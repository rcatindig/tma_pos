import React, { Component } from 'react';
import AuthService from '../../utils/AuthService';


class Login extends Component {

    constructor(props)
    {
        super(props);

        this.state = {
            username: "",
            password: "",
        }

        this.Auth = new AuthService();
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    componentWillMount(){
        if(this.Auth.loggedIn())
            this.props.history.replace('/');
    }

    handleSubmit = (event) => {
        event.preventDefault();

        const { username, password } = this.state;

        this.Auth.login(username, password)
            .then(res => {
                this.props.history.replace('/');
            })
            .catch(err => {
                alert(err);
            })
    }
    render() {

        const { username, password } = this.state;
        return (
            <div id="main-wrapper">
                <div className="unix-login">
                    <div className="container-fluid">
                        <div className="row justify-content-center">
                            <div className="col-lg-4">
                                <div className="login-content card">
                                    <div className="login-form">
                                        <h4>Login</h4>
                                        <div className="form-group">
                                            <label>Username</label>
                                            <input type="username" 
                                                className="form-control" 
                                                placeholder="Username" 
                                                value={username}
                                                onChange={(event) => this.setState({username: event.target.value})}/>
                                        </div>
                                        <div className="form-group">
                                            <label>Password</label>
                                            <input type="password" 
                                                className="form-control" 
                                                placeholder="Password" 
                                                value={password}
                                                onChange={(event) => this.setState({password: event.target.value})}/>
                                        </div>
                                        <div className="checkbox">
                                            <label>
                                                <input type="checkbox"/> Remember Me
                                            </label>
                                            <label className="pull-right">
                                                <a href="#">Forgotten Password?</a>
                                            </label>

                                        </div>
                                        <button type="submit" className="btn btn-primary btn-flat m-b-30 m-t-30" onClick={this.handleSubmit}>Sign in</button>
                                        <div className="register-link m-t-15 text-center">
                                            <p>Don't have account ? <a href="#"> Sign Up Here</a></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>  
            
        );
    }
}

export { Login };