import React from 'react';
import './signin.css';
import Logo from '../logos/Logo.js';


class Signin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }
    
    OnEmailChange = (event) => {
        this.setState({email: event.target.value})
    }
    OnPasswordChange = (event) => {
        this.setState({password: event.target.value})
    }
    OnSubmit = () => {
        fetch('http://localhost:9999/signin', {
            method: 'post',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password
            })
        }).then(response => response.json())
        .then(data => {
            if(data === 'wrong credentials')
                this.setState({password: ''});
            else    
                this.props.OnClickSignin({'value': 'home', 'id': data.id, 'userName': data.name, 'email': data.email, 'entries': data.entries });
        })
        .catch(err => console.log(err));
    }

    render(){
        const {change} = this.props;
        return (
            <div>
                <Logo />
                <div className='main center' >
                    <form className='form' >
                        <p>Email</p>
                        <input type='text' name='email' onChange={this.OnEmailChange}  />
                        <p>Password</p>
                        <input type='password' name='userpassword' onChange={this.OnPasswordChange}  /><br/><br/>
                        <p className='center' id='signin' style={{textAlign:"center"}} onClick={this.OnSubmit} >SignIn</p>
                        <p className='center' id='signin' style={{textAlign:"center"}} onClick={() => change('registerUser')} >Create new account</p>
                    </form>
                </div>
            </div>
    );
}}

class Register extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: ''
        }
    }

    OnNameChange = (event) => {
        this.setState({name: event.target.value})
    }

    OnEmailChange = (event) => {
        this.setState({email: event.target.value})
    }
    OnPasswordChange = (event) => {
        this.setState({password: event.target.value})
    }
    OnSubmit = () => {
        fetch('http://localhost:9999/register', {
            method: 'post',
            headers: {'content-type': 'application/json'},
            body : JSON.stringify({
                name: this.state.name,
                email: this.state.email,
                password: this.state.password
            })
        })
        .then(response => response.json())
        .then(data => {
            if(data === 'user name already exists')
                throw data;
            else {
                this.props.OnClickSignin({'value': 'home', 'id': data.id, 'userName': data.name, 'email': data.email, 'entries': data.entries });

            }
        })
        .catch(err => console.log(err));
    }

    render() {
        const {change} = this.props;

    return (
        <div>
            <Logo />
            <div className='main center' >
                <form className='form' >
                    <p>Name</p>
                    <input type='text' name='name' onChange={this.OnNameChange} />
                    <p>Email</p>
                    <input type='text' name='email' onChange={this.OnEmailChange}  />
                    <p>Password</p>
                    <input type='password' name='userpassword' onChange={this.OnPasswordChange}  /><br/><br/>
                    <p className='center' id='signin' style={{textAlign:"center"}} onClick={this.OnSubmit} >Register</p>
                    <p className='center' id='signin' style={{textAlign:"center"}} onClick={() => change('signinUser')} >SignIn</p>
                </form>
            </div>
        </div>
    );

}}

export   {Signin, Register};
