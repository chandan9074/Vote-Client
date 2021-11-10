import React, { Component } from 'react';
import axios from 'axios';

import PrivatePollOption from './privatepollOption.jsx';

import Sidebar from './../../othersComponent/sidebar.jsx';
import Navbar from '../../othersComponent/navbar.jsx';
import empty_search from './../../pictures/empty_search.png'

class PrivatePoll extends Component {
    state = { 
        private_polls:[],
     }

    componentDidMount(){
         this.fatch();
     }

      fatch=()=>{
             var config={
                headers:{'Authorization':`Token ${this.props.location.state.token.token}`}
            }
            var id = this.props.location.state.token.user_id

            axios.get(`https://vote-bd.herokuapp.com/votes_api/user_private_poll_view/${id}/`, config).then(res=>{
                var result = JSON.parse(JSON.stringify(res.data))
                this.setState({private_polls:result})
            })
         }

     handleDelete=(e)=>{
         var self = this;
        var config={
                headers:{'Authorization':`Token ${self.props.location.state.token.token}`}
            }
        var id = this.props.location.state.token.user_id
        var poll_id = e.target.id
        const del= async()=>{
            await axios.delete(`https://vote-bd.herokuapp.com/votes_api/user_private_poll_view/${poll_id}/`, config).then(response=>{
            })

            await axios.get(`https://vote-bd.herokuapp.com/votes_api/user_private_poll_view/${id}/`, config).then(res=>{
                var result = JSON.parse(JSON.stringify(res.data))
                this.setState({private_polls:result})
            })
            .catch(function(error){
                self.setState({private_polls:[]})
            })
        }
        del();
     }

    render() { 
        return ( 
            <div style={{backgroundColor:"", minHeight:"100vh", minWidth:"100vh"}} >
                <Navbar pageName="My Private Polls" username={this.props.location.state.token.username} />
                <div className="privatepoll_flex_style">
                    <div className="fix_side">
                        
                        <Sidebar token={this.props.location.state.token} />
                    </div>
                
                    <div className="privatepoll_style">
                        {this.state.private_polls.length===0?<div className="empty_div_style">
                        <img className="empty_img_style" src={empty_search} alt="empty"></img>
                        </div>:<div>
                        {this.state.private_polls.map(poll=>(
                            <div className="poll_details">
                                <p className="details_style title_style">{poll.title}</p> <br/>
                                <p className="details_style des_style">{poll.description}</p>
                                <PrivatePollOption poll_id={poll.id} token={this.props.location.state.token.token} />
                                <div className="align_del_btn">
                                    <button id={poll.id} className="del_btn_style" onClick={(e)=>this.handleDelete(e)} >DELETE</button>
                                </div>
                            </div>
                        ))}
                        </div>
                        }
                    </div>
                </div>
            </div>
         );
    }
}
 
export default PrivatePoll;