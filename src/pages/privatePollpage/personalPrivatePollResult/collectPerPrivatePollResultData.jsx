import axios from 'axios';
import React, { Component } from 'react';

import PerPrivatePollResult from './perPrivatePollResult.jsx';

class CollectPrivatePollResultData extends Component {
    state = { 
        personal_private_poll_result:[],
     }

    componentDidMount(){
        var config={
                headers:{'Authorization':`Token ${this.props.token}`}
            }
        const fatch=()=>{
            axios.get(`http://127.0.0.1:8000/votes_api/personal_private_poll_result_view/${this.props.poll_id}/`, config).then(response=>{
                this.setState({personal_private_poll_result:response.data})
            })   
        }
        fatch();
    }

    render() { 
        return ( 
            <div >
                {this.state.personal_private_poll_result.map(result=>(
                    <PerPrivatePollResult poll_title={this.props.poll_title} privatepoll_option={result.privatepoll_option} user_profile={result.user_profile} token={this.props.token} />
                ))}
            </div>
         );
    }
}
 
export default CollectPrivatePollResultData;