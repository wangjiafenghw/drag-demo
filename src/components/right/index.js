import React, { Component } from 'react';
import Target from './target';
import './index.css';

class Right extends Component {
    constructor(){
        super();
        this.state = {}
    }
    render() {
        const {
            dataSource=[]
        } = this.props;
        return (
            <div className='right-container'>
                {
                    dataSource.map((item, index) => <Target key={item.id} handlePick={this.props.handlePick} id={item.id}>
                        {
                            JSON.stringify(this.props.source['pick'+item.id])
                        }
                    </Target>)
                }
            </div>
        )
    }
}

export default Right;
