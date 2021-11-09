import React, { Component } from 'react';
import axios from 'axios';
import './publicpollStyle.css';

import PublicProgressBer from './../../othersComponent/publicProgressBer.jsx';

class AllPublicPollOption extends Component {

    constructor(props){
       super(props);
       this.state = { 
            public_poll_options:[],
            handle_save:false,
            selected_option:"",
            allready_polled: false,
            checked_btn:"",
            check_poll_id:"",
            shouldProgressBarRerender:true, 
        }

        
    }

    componentDidMount(){
        var config={
                headers:{'Authorization':`Token ${this.props.token.token}`}
            }
        
        const fatch=()=>{
            axios.get(`http://127.0.0.1:8000/votes_api/specific_public_poll_option_view/${this.props.poll_id}/`, config).then(res=>{
                this.setState({public_poll_options:res.data})
            })
        }
        fatch();
    }

    handleSave=async ()=>{
        var self = this;
        const fatch= async()=>{
            document.getElementById(this.state.checked_btn).checked=false;
            this.setState({handle_save:false})

            var config={
                headers:{
                    'Authorization':`Token ${this.props.token.token}`,
                    'Content-Type':'application/json'
                }
            }
            var option_data={
                publicpoll_option:this.state.selected_option,
                publicpoll:this.props.poll_id,
                user_profile:this.props.token.user_id
            }

            await axios.post('http://127.0.0.1:8000/votes_api/public_poll_result_view/', option_data, config).then(res=>{
                // this.setState({public_poll_options:this.state.selected_option})
                console.log(res.data)
                this.setState({shouldProgressBarRerender:true})
            })
            .catch(function(error){
                self.setState({allready_polled:true})
                self.setState({check_poll_id:self.props.poll_id})
            })
        }
        fatch();
        // this.handleShouldProgressBarRerender(true)
    }


    clearSelect=()=>{
        document.getElementById(this.state.checked_btn).checked=false;
    }

    handleOptionClick= async(e)=>{
        var x = e.target.value;
        this.setState({selected_option:x});
        await this.setState({checked_btn:e.target.id})
        this.setState({handle_save:true})        
    }

    setShouldProgressBarRerender=(value)=>{
        this.setState({shouldProgressBarRerender:value})
    }


    render() { 
        return ( 
            <div className="options_flex">
                <div style={{width:"70%"}}>
                    {this.state.public_poll_options.map((options, index)=>(
                        <div className="flex_progess">
                            <p className="option_margin"><input type="radio" className="radio_carsor" id={this.props.poll_id+index+options.id} onClick={(e)=>this.handleOptionClick(e)} name="options" value={options.id} /><span className="option_style">{options.option}</span></p>
                            <PublicProgressBer setShouldProgressBarRerender={this.setShouldProgressBarRerender} shouldProgressBarRerender={this.state.shouldProgressBarRerender} option_id={options.id} poll_id={this.props.poll_id} token={this.props.token.token} />
                        </div>
                    ))}
                    <div className="warning_flex_style">
                        {this.state.check_poll_id && this.state.allready_polled?<div className="warning_style">You already voted</div>:null} 
                    </div>
                    <div className="save_btn_flex_style">
                        {this.state.handle_save?<button type="submit" className="save_btn_style" onClick={this.handleSave} >SAVE</button>:
                        <button className="save_btn_style" type="submit" >SAVE</button>}
                        <button type="submit" className="clear_btn_style" onClick={this.clearSelect} >CLEAR</button>
                    </div>
                </div>
            </div> 
        );
    }
}
 
export default AllPublicPollOption;