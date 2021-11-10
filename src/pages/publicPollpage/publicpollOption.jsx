import React, { Component } from 'react';
import axios from 'axios';

import PublicProgressBer from './../../othersComponent/publicProgressBer.jsx';

import './publicpollStyle.css';

class PublicPollOption extends Component {
    state = { 
        public_poll_options:[],
     }

    componentDidMount(){
        var config={
                headers:{'Authorization':`Token ${this.props.token}`}
            }
        
        const fatch=()=>{
            axios.get(`https://vote-bd.herokuapp.com/votes_api/specific_public_poll_option_view/${this.props.poll_id}/`, config).then(res=>{
                this.setState({public_poll_options:res.data})
            })
        }
        fatch();
    }

    render() { 
        return ( 
            <div className="options_flex">
                <div style={{width:"70%"}}>
                {this.state.public_poll_options.map((options, index)=>(
                    <div className="flex_progess">
                    <p className="option_margin"><span className="option_number">{index+1}</span><span className="option_style">{options.option}</span></p>
                    <PublicProgressBer option_id={options.id} poll_id={this.props.poll_id} token={this.props.token} />
                    </div>
                ))}
                </div>
            </div>
         );
    }
}
 
export default PublicPollOption;