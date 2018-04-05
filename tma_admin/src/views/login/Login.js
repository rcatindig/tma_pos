import React, { Component } from 'react';
import AuthService from '../../utils/AuthService';
import SweetAlert from 'react-bootstrap-sweetalert';


class Login extends Component {

    constructor(props)
    {
        super(props);

        this.state = {
            username: "",
            password: "",
            showAlert: false,
            alertMessage: "Your username or password is invalid."
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
        //alert(password);

        if(username === "" && password === "") {
            this.setState({showAlert: true, alertMessage: "Username and Password cannot be empty."});
            return;
        }
        else if(username === "" && password !== "") {
            this.setState({showAlert: true, alertMessage: "Username cannot be empty."});
            return;
        } else if (username !== "" && password === "") {
            this.setState({showAlert: true, alertMessage: "Password cannot be empty."});
            return;
        } else {
            this.Auth.login(username, password)
            .then(res => {
                
                this.props.history.replace('/');
            })
            .catch(err => {
                this.setState({showAlert: true, alertMessage: "Your username or password is invalid."});
                console.log(err);
            })
        }
            
        
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

                <SweetAlert 
                    error
                    //showCancel
                    confirmBtnText="Close"
                    confirmBtnBsStyle="danger"
                    cancelBtnBsStyle="default"
                    title="Login Failed!"
                    onConfirm={() => this.setState({showAlert: false})}
                    // onCancel={this.cancelDelete}
                    show={this.state.showAlert}
                >
                    {this.state.alertMessage}
                </SweetAlert>

            </div>  
            
        );
    }
}

export { Login };