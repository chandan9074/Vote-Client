import React, { Component } from 'react';
import axios from 'axios';

import PrivateProgressBer from './../../othersComponent/privateProgressBer.jsx';
import './privatepollStyle.css';

class PrivatePollOption extends Component {
    state = { 
        private_poll_options:[],
     }

    componentDidMount(){
        var config={
                headers:{'Authorization':`Token ${this.props.token}`}
            }
    
        const fatch=()=>{
            axios.get(`https://vote-bd.herokuapp.com/votes_api/specific_private_poll_option_view/${this.props.poll_id}/`, config).then(res=>{
                this.setState({private_poll_options:res.data})
            })
        }
        fatch();
    }

    render() { 
        return ( 
            <div className="options_flex">
                <div style={{width:"70%"}}>
                    {this.state.private_poll_options.map((options, index)=>(
                        <div className="flex_progess">
                        <p className="option_margin"><span className="option_number">{index+1}</span><span className="option_style">{options.option}</span></p>
                        <PrivateProgressBer option_id={options.id} poll_id={this.props.poll_id} token={this.props.token} />
                        </div>
                    ))}
                </div>
            </div>
         );
    }
}
 
export default PrivatePollOption;