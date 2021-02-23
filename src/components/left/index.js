import React, { Component } from 'react';
import Item from './item';
import './index.css';

class Left extends Component {
    constructor(props) {
        super();
    }
    render() {
        const {
            dataSource = []
        } = this.props;
        return (
            <div className='left-container'>
                {
                    dataSource.map(item => <Item handlePick={this.props.handlePick} key={item.id} item={item} />)
                }
            </div>
        )
    }
}

export default Left;
