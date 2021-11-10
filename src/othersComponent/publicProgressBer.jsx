import React, { Component } from 'react';
import axios from 'axios';

class PublicProgressBer extends Component {
    state = { 
        public_poll_count:[],
        public_poll_options_count:[],
        public_poll_no:0,
        public_poll_options_no:0,
        final_output:0,
        allready_polled:false,
     }

    componentDidMount(){
        this.fatch();
    }


    fatch =async () =>{

        var config = {
            headers:{'Authorization':`Token ${this.props.token}`}
        }
        await axios.get(`https://vote-bd.herokuapp.com/votes_api/public_poll_count_view/${this.props.poll_id}/`, config).then(res=>{
            this.setState({public_poll_count:res.data})
            var x = this.state.public_poll_count.length
            this.setState({public_poll_no:x})

            axios.get(`https://vote-bd.herokuapp.com/votes_api/public_poll_option_count_view/${this.props.option_id}/`, config).then(res=>{
                this.setState({public_poll_options_count:res.data})
                var y = this.state.public_poll_options_count.length
                this.setState({public_poll_options_no:y})

            }).then(()=>{this.handleCalc()})
        })

        this.props.setShouldProgressBarRerender?.(false);
    }

    handleCalc=()=>{
        var first = this.state.public_poll_options_no * 100;
        var second  = first/this.state.public_poll_no
        this.setState({final_output:second.toFixed(0)})
    }


    render() { 
        if(this.props.shouldProgressBarRerender){
            this.fatch();
        }

        return ( 
            <div style={{width:"12vh", height:"12vh",  marginLeft:"2vh"}}>
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
 
export default PublicProgressBer;