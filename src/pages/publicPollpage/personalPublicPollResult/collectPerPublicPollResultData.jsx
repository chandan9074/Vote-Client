import axios from 'axios';
import React, { Component } from 'react';

import PerPublicPollResult from './perPublicPollResult.jsx';

class CollectPublicPollResultData extends Component {
    state = { 
        personal_public_poll_result:[],
     }

    componentDidMount(){

        var config={
                headers:{'Authorization':`Token ${this.props.token}`}
            }
        const fatch=()=>{
            axios.get(`http://127.0.0.1:8000/votes_api/personal_public_poll_result_view/${this.props.poll_id}/`, config).then(response=>{
                this.setState({personal_public_poll_result:response.data})
            })   
        }
        fatch();
    }

    render() { 
        return ( 
            <div >
                {this.state.personal_public_poll_result.map(result=>(
                    <PerPublicPollResult poll_title={this.props.poll_title} publicpoll_option={result.publicpoll_option} user_profile={result.user_profile} token={this.props.token} />
                ))}
            </div>
         );
    }
}
 
export default CollectPublicPollResultData;