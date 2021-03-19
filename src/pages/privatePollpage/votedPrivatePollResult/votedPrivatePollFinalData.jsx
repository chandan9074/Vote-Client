import React, { Component } from 'react';
import axios from 'axios';

class VotedPrivatePollFinalData extends Component {
    state = { 
        private_poll_option_details:[],
        private_details:"",
        x:[]
     }

    componentDidMount(){
        var config={
                headers:{'Authorization':`Token ${this.props.token}`}
            }
        const fatch= async()=>{
            
            await axios.get(`http://127.0.0.1:8000/votes_api/private_poll_details_view/${this.props.privatepoll}/`, config).then(response=>{
                var y = response.data.title
                this.setState({private_details:y})
            }) 

            await axios.get(`http://127.0.0.1:8000/votes_api/single_private_poll_option_view/${this.props.privatepoll_option}/`, config).then(response=>{
                 this.setState({private_poll_option_details:response.data})
            }) 
        }
        fatch()
    }


    render() {     
        return ( 
            <tbody>
                <tr>
                    <td className="border_style td_name_style">{this.state.private_details}</td>
                    {this.state.private_poll_option_details.map(details=>(
                        <td className="border_style td_option_style">{details.option}</td>
                    ))}
                </tr>
            </tbody>
         );
    }
}
 
export default VotedPrivatePollFinalData;