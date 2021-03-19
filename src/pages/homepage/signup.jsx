import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class Signup extends Component {
    state = { 
        isSignup:false,
        incorrect:false
     }

    hendleSignup=()=>{
        var f_name = document.getElementById('f_name').value;
        var l_name = document.getElementById('L_name').value;
        var username = document.getElementById('usr_name').value;
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;

        const postSignupData=()=>{
            var self=this;
            var signupData = {
                first_name : f_name,
                last_name : l_name,
                username: username,
                email: email, 
                password:password
            }
            var config={
                headers:{'Content-Type':'application/json'}
            }
            
            axios.post('http://127.0.0.1:8000/accounts_api/signup/', signupData, config).then(response=> {
                if(response.status===200){
                    this.setState({isSignup:true})
                    this.setState({incorrect:false})
                }
            })
            .catch(function(error){
                self.setState({incorrect:true})
                console.log("dukhche")
            })

        }
        postSignupData();
    }

    render() { 
        if(this.state.isSignup){
            return (
                <Redirect to={{pathname:"/login"}} />
            );
        }
        return ( 
            <div className="flex_login">
                <div className="login_card">
                     <p className="login_head">Welcome</p>
                     <input type="text" id="f_name" className="inpt_style" placeholder="First Name" />
                     <input type="text" id="L_name" className="inpt_style" placeholder="Last Name" />
                     <input type="text" id="usr_name" className="inpt_style" placeholder="Username" />
                     <input type="email" id="email" className="inpt_style" placeholder="Email" />
                     <input type="password" id="password" className="inpt_style" placeholder="Password" /><br></br>
                    {this.state.incorrect?<div class="alert alert-warning" role="alert" style={{transition:"4s"}}>
                            Invalid Username or Password
                            </div>:null}
                    <button type="submit" onClick={this.hendleSignup} className="login_btn_style">Signup</button>
                </div>
            </div>
         );
    }
}
 
export default Signup;