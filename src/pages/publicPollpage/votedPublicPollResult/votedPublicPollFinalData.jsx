import React, { Component } from 'react';
import axios from 'axios';

class VotedPublicPollFinalData extends Component {
    state = { 
        public_poll_option_details:[],
        public_details:"",
        x:[]
     }

    componentDidMount(){
        
        var config={
                headers:{'Authorization':`Token ${this.props.token}`}
            }

        const fatch= async()=>{
            
            await axios.get(`http://127.0.0.1:8000/votes_api/public_poll_details_view/${this.props.publicpoll}/`, config).then(response=>{
                var y = response.data.title
                this.setState({public_details:y})
            }) 

            await axios.get(`http://127.0.0.1:8000/votes_api/single_public_poll_option_view/${this.props.publicpoll_option}/`, config).then(response=>{
                 this.setState({public_poll_option_details:response.data})
            }) 
        }
        fatch()
    }


    render() { 
        return ( 
            <tbody>
                <tr>
                    <td className="border_style td_name_style">{this.state.public_details}</td>
                    {this.state.public_poll_option_details.map(details=>(
                        <td className="border_style td_option_style">{details.option}</td>
                    ))}
                </tr>
            </tbody>
         );
    }
}
 
export default VotedPublicPollFinalData;