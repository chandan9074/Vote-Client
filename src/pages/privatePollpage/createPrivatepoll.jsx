import axios from 'axios';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class CreatePrivatePoll extends Component {
    state = { 
        options:[""],
        poll_done:false,
        empty_option:true,
        invalid:false
     }

    addOptions=()=>{
        this.setState({options:[...this.state.options, ""]})
        this.setState({empty_option:true})
    }

    handleChange=(e, index)=>{
        this.state.options[index]=e.target.value;
        this.setState({options: this.state.options})
        if(this.state.options[index]===""){
            this.setState({empty_option:true})
        }
        else{
            this.setState({empty_option:false})
        }

    }

    handleRemove=(index)=>{
        if(this.state.options.length>1){
            this.state.options.splice(index, 1)
            this.setState({options:this.state.options})
            this.setState({empty_option:false})
        }
    }

    savePrivatePoll=()=>{
        var p_title = document.getElementById('title_id').value;
        var p_des = document.getElementById('des_id').value;
        var p_pass = document.getElementById('pass_id').value;
        var p_time = document.getElementById('time_id').value;

        var poll_data = {
            title:p_title, 
            description:p_des, 
            slug: this.props.location.state.token.token, 
            password: p_pass, 
            time_duration: p_time, 
            user_profile: this.props.location.state.token.user_id
        }

        var config={
            headers:{'Authorization':`Token ${this.props.location.state.token.token}`}
        }
        const fatch=()=>{
            if(p_title!=="" && p_des!=="" && p_time!=="" && p_pass!=="" && this.state.empty_option===false){
            axios.post('https://vote-bd.herokuapp.com/votes_api/private_poll_view/', poll_data, config).then(res=>{
                var result = res.data;
                var i=0;
                for(i=0; i<this.state.options.length; i++){
                    var o_option = this.state.options[i]
                    var option_data = {
                        option: o_option, 
                        slug: this.props.location.state.token.token, 
                        privatepoll:result.id, 
                        user_profile: this.props.location.state.token.user_id
                    }

                    var config={
                         headers:{'Authorization':`Token ${this.props.location.state.token.token}`}
                    }
                    
                    axios.post('https://vote-bd.herokuapp.com/votes_api/private_poll_option_view/',option_data, config).then(res=>{
                        if(i===this.state.options.length){
                            this.setState({poll_done:true})
                        }
                    })
                }
            })
            }
            else{
                this.setState({invalid:true})
            }
        }
        fatch();
    }

    render() { 
        if(this.state.poll_done){
            return (
                <Redirect to={{pathname:"/dashboard/privatepoll", state:{token:this.props.location.state.token}}} />
            );
        }
        return ( 
            <div className="flex_login">      
                <div className="login_card">
                    <p className="login_head">Create Your Poll</p>
                    <input type="text" id="title_id" className="inpt_style" placeholder="Title" />
                    <textarea type="text" id="des_id" className="inpt_style" placeholder="Poll descriptions" />
                    <input type="password" id="pass_id" className="inpt_style" placeholder="Password" /> <br/>
                    <input type="datetime-local" className="inpt_style" id="time_id" />

                    <div className="create_option_style">
                        {this.state.options.map((option, index)=>(
                            <div key={index}>
                                <input className="option_inpt_style" placeholder="Write Option" onChange={(e)=>this.handleChange(e, index)} value={option} />
                                <button className="remove_btn_style" onClick={()=>this.handleRemove(index)}>-</button> <br/>
                            </div> 
                        ))}
                        <div className="aling_create_btn">
                            {this.state.empty_option?
                            <button className="add_btn_style" onClick={(e)=>this.addOptions(e)} disabled >Add Option</button>:
                            <button className="add_btn_style" onClick={(e)=>this.addOptions(e)} >Add Option</button>}
                        </div>
                    </div>
                    {this.state.invalid?<div class="alert alert-warning" role="alert" style={{fontSize:"1.5vh", padding:"1vh", marginBottom:"1vh"}}>
                            Inavlid input, input everything properly
                            </div>:null}
                    <button type="submit" onClick={this.savePrivatePoll} className="login_btn_style">Submit <span></span></button>
                </div>
            </div>
         );
    }
}
 
export default CreatePrivatePoll;