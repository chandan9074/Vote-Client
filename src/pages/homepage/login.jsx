import axios from 'axios';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './homeStyle.css'
import {
  Link
} from "react-router-dom";
class Login extends Component {
    state = { 
        token:"",
        incorrect:false,
        isLogin:false
     }

    hendelLogin = () =>{
        var u_name = document.getElementById('u_name').value;
        var pass = document.getElementById('pass').value;

        const postLoginData=()=>{
            var self=this;
            var loginData = {
                username:u_name, 
                password:pass
            }
            var config={
                headers:{'Content-Type':'application/json'}
            }
            
            axios.post('https://vote-bd.herokuapp.com/accounts_api/login/', loginData, config).then(response=> {
                if(response.status===200){
                    this.setState({token:response.data})
                    this.setState({isLogin:true})
                    this.setState({incorrect:false})
                }
            })
            .catch(function(error){
                self.setState({incorrect:true})
            })
        }
        postLoginData();
    }

    render() { 
        if(this.state.isLogin){
            return (
                <Redirect to={{pathname:"/dashboard", state:{token:this.state.token}}} />
            );
        }
        return ( 
            <div className="flex_login">
                <div className="login_card">
                    <p className="login_head">Welcome Back</p>
                    <input type="text" id="u_name" className="inpt_style" placeholder="Username" />
                    <input type="password" id="pass" className="inpt_style"  placeholder="Password" />
                    {this.state.incorrect?<div class="alert alert-warning" role="alert" style={{transition:"4s"}}>
                            Invalid Username or Password
                            </div>:null}
                    <button type="submit" onClick={this.hendelLogin} className="login_btn_style">Login <span></span></button>
                    <p style={{marginTop:"1vh"}}>Don't have account? <Link to="/signup" style={{color:"white"}}>Singup</Link> </p>
                </div>
            </div>
         );
    }
}
 
export default Login;