import React, { Component } from 'react';
import axios from 'axios';

import PrivateProgressBer from './../../othersComponent/privateProgressBer.jsx';

class AllPrivatePollOption extends Component {
    constructor(props){
        super(props);
        this.state = { 
            private_poll_options:[],
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
            axios.get(`http://127.0.0.1:8000/votes_api/specific_private_poll_option_view/${this.props.poll_id}/`, config).then(res=>{
                this.setState({private_poll_options:res.data})
            })
        }
        fatch();
    }

    handleSave=()=>{
        var self = this;
        const fatch= async ()=>{

            document.getElementById(this.state.checked_btn).checked=false;   
            var x = 0;
            var config={
                headers:{
                    'Authorization':`Token ${this.props.token.token}`,
                }
            }
            var option_data={
                privatepoll_option:this.state.selected_option,
                privatepoll:this.props.poll_id,
                user_profile:this.props.token.user_id
            }

            await axios.post('http://127.0.0.1:8000/votes_api/private_poll_result_view/', option_data, config).then(res=>{
                if(res.status===200){
                    // this.handlePercent();
                    this.setState({shouldProgressBarRerender:true})
                    x = 1;
                }
            })
            .catch(function(error){
                self.setState({allready_polled:false})
                self.setState({check_poll_id:self.props.poll_id})
                
            })

            if (x===0){
                self.setState({allready_polled:true})
                self.setState({check_poll_id:self.props.poll_id})
            }
        }
        fatch();
        // this.handleShouldProgressBarRerender(true)
    }

    clearSelect=()=>{
        document.getElementById(this.state.checked_btn).checked=false;
    }

    handleOptionClick=(e)=>{
        var x = e.target.value;
        this.setState({selected_option:x});
        this.setState({checked_btn:e.target.id})
        this.setState({handle_save:true})
        
    }

    handleShouldProgressBarRerender=(value)=>{
        this.setState({shouldProgressBarRerender:value})
    }

    render() { 
        return ( 
            <div className="options_flex">
                <div style={{width:"70%"}}>
                    {this.state.private_poll_options.map((options, index)=>(
                        <div className="flex_progess" key={index}>
                        <p className="option_margin"><input className="radio_carsor" type="radio" id={index} onClick={(e)=>this.handleOptionClick(e)} name="options" value={options.id} /><span className="option_style">{options.option}</span></p>
                        <PrivateProgressBer handleShouldProgressBarRerender={this.handleShouldProgressBarRerender} shouldProgressBarRerender={this.state.shouldProgressBarRerender}  option_id={options.id} poll_id={this.props.poll_id} token={this.props.token.token} />
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
 
export default AllPrivatePollOption;