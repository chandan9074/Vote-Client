import React, { Component } from 'react';
import axios from 'axios';

class PerPrivatePollResult extends Component {
    state = { 
        user_details:[],
        private_poll_option_details:[],
     } 

    componentDidMount(){
        var config={
                headers:{'Authorization':`Token ${this.props.token}`}
            }
        const fatch= async()=>{
            
            await axios.get(`https://vote-bd.herokuapp.com/votes_api/user_details_view/${this.props.user_profile}/`, config).then(response=>{
                this.setState({user_details:response.data})
            }) 

            await axios.get(`https://vote-bd.herokuapp.com/votes_api/single_private_poll_option_view/${this.props.privatepoll_option}/`, config).then(response=>{
                this.setState({private_poll_option_details:response.data})
            }) 
        }
        fatch()
    }

    render() { 
        return ( 
            <div>
                
                    <table className="table_style">
                            <tr className="">
                                <th colSpan="2" className="border_style table_title_style">{this.props.poll_title}</th>
                            </tr>
                            <tr>
                                <th className="border_style th_name_style">Name</th>
                                <th className="border_style th_option_style" >Selected option</th>
                            </tr>
                                {this.state.user_details.length===0?
                                <tr>
                                <td colSpan="2" className="border_style td_name_style" style={{textAlign:"center"}}>No Result</td>
                                </tr>
                                :<tr>
                                {this.state.user_details.map(user=>(
                                    <td className="border_style td_name_style">{user.username}</td>
                                ))}
                                {this.state.private_poll_option_details.map(option=>(
                                    <td className="border_style td_option_style">{option.option}</td>
                                ))}
                                </tr>
                                }
                        </table>                
            </div>
         ); 
    }
}
 
export default PerPrivatePollResult;