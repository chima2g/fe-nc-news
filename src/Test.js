import React, { Component } from 'react';
import axios from 'axios';

class Test extends Component {

    state = { currentStudents : 0, graduate_ids : [], gradCount : 0 };

    componentDidMount() {
        console.log("111");
        axios.get('https://be-nc-news-chima2g.herokuapp.com/api/topics')
        .then(response => {
            console.log("222");
            console.dir(response);
        })
    }

    render() {
        return (
            <div>
            </div>
        )
    }
}

export default Test 