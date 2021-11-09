import React, { Component } from 'react';
import axios from 'axios';

class PrivateProgressBer extends Component {
    state = { 
        private_poll_count:[],
        private_poll_options_count:[],
        private_poll_no:0,
        private_poll_options_no:0,
        final_output:0,
        private_poll_options_plz:[],
        just:false,

     }
    
    componentDidMount=()=>{
        this.fatch();
    }

    
    fatch = () =>{
        var config = {
                headers:{'Authorization':`Token ${this.props.token}`}
            }
             axios.get(`http://127.0.0.1:8000/votes_api/private_poll_count_view/${this.props.poll_id}/`, config).then(res=>{

                this.setState({private_poll_count:res.data})
                var x = this.state.private_poll_count.length
                this.setState({private_poll_no:x})

                 axios.get(`http://127.0.0.1:8000/votes_api/private_poll_option_count_view/${this.props.option_id}/`, config).then(res=>{
                    this.setState({private_poll_options_count:res.data})
                    var y = this.state.private_poll_options_count.length
                    this.setState({private_poll_options_no:y})
                }).then(()=>{this.handleCalc()})
            })
            this.props.handleShouldProgressBarRerender?.(false);
        }

    handleCalc=()=>{
        var first = this.state.private_poll_options_no * 100;
        var second  = first/this.state.private_poll_no
        this.setState({final_output:second.toFixed(0)})
    }


    render() {   
        if(this.props.shouldProgressBarRerender){
            this.fatch();
        }

        return ( 
            <div style={{width:"12vh", height:"12vh", marginLeft:"2vh"}}>
                <div class="percent">
                    <svg style={{'--percent':this.state.final_output, width:"12vh", height:"12vh"}}>
                        <circle className="krisno" cx="5vh" cy="5vh" r="5vh"></circle>
                        <circle className="krisno" cx="5vh" cy="5vh" r="5vh"></circle>
                        <text class="number" x="50%" y="50%" textAnchor="middle" alignmentBaseline="middle">{this.state.final_output}%</text>
                    </svg>        
                </div>
            </div>
         );
    }
}
 
export default PrivateProgressBer;