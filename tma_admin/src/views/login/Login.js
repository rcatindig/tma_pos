import React, { Component } from 'react';
import AuthService from '../../utils/AuthService';
import SweetAlert from 'react-bootstrap-sweetalert';
import { MdInput } from '../../components';


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

            <section className="login p-fixed d-flex text-center bg-primary common-img-bg">
                
                <div className="container-fluid">
                    <div className="row">

                        <div className="col-sm-12">
                            <div className="login-card card-block">
                                <form className="md-float-material">
                                    <div className="text-center">
                                        <img src="assets/images/tmalogo-login.png" alt="logo" />
                                    </div>
                                    <h3 className="text-center txt-primary">
                                        Sign In to your account
                                    </h3>
                                    {/* <div className="md-input-wrapper">
                                        <input type="text" 
                                            className="md-form-control"
                                            value={username}
                                            onChange={(event) => this.setState({username: event.target.value})}
                                        />
                                        <label>Username</label>
                                    </div> */}
                                    <MdInput
                                        label="Username"
                                        value={username}
                                        onChange={(event) => this.setState({username: event.target.value })}/>
                                    <MdInput
                                        label="Password"
                                        value={password}
                                        type="password"
                                        onChange={(event) => this.setState({password: event.target.value })}/>
                                    {/* <div className="md-input-wrapper">
                                        <input type="password" 
                                                className="md-form-control"
                                                type="password"
                                                value={password}
                                                onChange={(event) => this.setState({password: event.target.value})}
                                         />
                                        <label>Password</label>
                                    </div> */}
                                    <div className="row">
                                        <div className="col-sm-6 col-xs-12">
                                        <div className="rkmd-checkbox checkbox-rotate checkbox-ripple m-b-25">
                                            <label className="input-checkbox checkbox-primary">
                                                <input type="checkbox" id="checkbox" />
                                                <span className="checkbox"></span>
                                            </label>
                                            <div className="captions">Remember Me</div>

                                        </div>
                                            </div>
                                        <div className="col-sm-6 col-xs-12 forgot-phone text-right">
                                            <a href="forgot-password.html" className="text-right f-w-600"> Forget Password?</a>
                                            </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-xs-10 offset-xs-1">
                                            <button type="button" className="btn btn-primary btn-md btn-block waves-effect text-center m-b-20" onClick={this.handleSubmit}>LOGIN</button>
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-xs-12 text-center">
                                        <span className="text-muted">Don't have an account?</span>
                                        <a href="register2.html" className="f-w-600 p-l-5">Sign up Now</a>
                                    </div>
                                </form>
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
            </section>
            // <div id="login-wrapper">
            //     <div className="unix-login">
            //         <div className="container-fluid">
            //             <div className="row justify-content-center">
            //                 <div className="col-lg-4">
            //                     <div className="login-content card">
            //                         <div className="login-form">
            //                             <h4>Login</h4>
            //                             <div className="form-group">
            //                                 <label>Username</label>
            //                                 <input type="username" 
            //                                     className="form-control" 
            //                                     placeholder="Username" 
            //                                     value={username}
            //                                     onChange={(event) => this.setState({username: event.target.value})}/>
            //                             </div>
            //                             <div className="form-group">
            //                                 <label>Password</label>
            //                                 <input type="password" 
            //                                     className="form-control" 
            //                                     placeholder="Password" 
            //                                     value={password}
            //                                     onChange={(event) => this.setState({password: event.target.value})}/>
            //                             </div>
            //                             <div className="checkbox">
            //                                 <label>
            //                                     <input type="checkbox"/> Remember Me
            //                                 </label>
            //                                 <label className="pull-right">
            //                                     <a href="#">Forgotten Password?</a>
            //                                 </label>

            //                             </div>
            //                             <button type="submit" className="btn btn-primary btn-flat m-b-30 m-t-30" onClick={this.handleSubmit}>Sign in</button>
            //                             <div className="register-link m-t-15 text-center">
            //                                 <p>Don't have account ? <a href="#"> Sign Up Here</a></p>
            //                             </div>
            //                         </div>
            //                     </div>
            //                 </div>
            //             </div>
            //         </div>
            //     </div>

                

            // </div>  
            
        );
    }
}

export { Login };