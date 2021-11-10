import React, { Component } from 'react';
import axios from 'axios';

import Navbar from '../../../othersComponent/navbar.jsx';
import Sidebar from '../../../othersComponent/sidebar.jsx';
import VotedPrivatePollFinalData from './votedPrivatePollFinalData.jsx';

class VotedPrivatePollData extends Component {
    state = { 
        private_polls_result_details:[],
     }

    componentDidMount(){
        var config={
                headers:{'Authorization':`Token ${this.props.location.state.token.token}`}
            }
        var id = this.props.location.state.token.user_id
        const fatch=()=>{

            axios.get(`http://127.0.0.1:8000/votes_api/private_poll_result_by_user/${id}/`, config).then(res=>{
                var result = JSON.parse(JSON.stringify(res.data))
                this.setState({private_polls_result_details:result})
            })
        }
        fatch();
     }

    render() { 
        return ( 
            <div style={{backgroundColor:"", minHeight:"100vh", minWidth:"100vh"}}>
                <Navbar pageName="My voted private poll" username={this.props.location.state.token.username} />
                <div className="publicpoll_flex_style">
                    <div className="fix_side">
                        <Sidebar token={this.props.location.state.token} />
                    </div>
                    <div className="publicpoll_style">
                        <table className="table_style">
                            <tr>
                                <th className="border_style th_name_style left_radius_style">Poll Name</th>
                                <th className="border_style th_option_style right_radius_style">Selected Option</th>
                            </tr>
                            
                            {this.state.private_polls_result_details.length===0?
                            <tr>
                                <td colSpan="2" className="border_style td_name_style" style={{textAlign:"center"}}>No Result</td>
                            </tr>
                            :<React.Fragment>

                            {this.state.private_polls_result_details.map((details, index)=>(
                                <VotedPrivatePollFinalData key={index} privatepoll={details.privatepoll} privatepoll_option={details.privatepoll_option} token={this.props.location.state.token.token} />
                            ))}
                            </React.Fragment>
                            }
                        </table>
                    </div>
                </div>
            </div>
         );
    }
}
 
export default VotedPrivatePollData;