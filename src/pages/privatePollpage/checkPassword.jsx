import React, { Component } from 'react';
import './../homepage/homeStyle.css';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class CheckPassword extends Component {

    state = { 
        private_polls:[],
        done:false,
        incorrect:false,
     }
     handelpassword=()=>{
        var self = this;
        var config={
        headers:{
            'Authorization':`Token ${this.props.location.state.token.token}`,
            'Content-Type':'application/json'
            }
        }
        var poll_data = document.getElementById('pass').value;
        const fatch=()=>{

            axios.get(`http://127.0.0.1:8000/votes_api/private_poll_request_view/${poll_data}/`, config).then(res=>{
                this.setState({private_polls:res.data})
                this.setState({done:true})
            })
            .catch(function(error){
                self.setState({incorrect:true})
            })
        }
        fatch();
    }

    render() { 
        if(this.state.done){
            return (
                <Redirect to={{pathname:"/dashboard/publicpoll/allprivatepoll", state:{token:this.props.location.state.token, private_polls:this.state.private_polls}}} />
            );
        }
        return ( 
            <div className="flex_login">
                <div className="login_card">
                    <p className="login_head">Give Poll Password</p>
                    <input type="password" id="pass" className="inpt_style" autoFocus  placeholder="Password" />
                    {this.state.incorrect?<div class="alert alert-warning" role="alert" style={{transition:"4s"}}>
                            Invalid Password
                            </div>:null}
                    <button type="submit" onClick={this.handelpassword} className="login_btn_style">Submit</button>
                </div>
            </div>
         );
    }
}
 
export default CheckPassword;