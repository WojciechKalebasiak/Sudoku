import React, { Component } from 'react';
import '../styles/Tile.css';
class Tile extends Component {
    handleChange = (e) => {
        this.props.update(this.props.id, e.target.value);
    }
    renderHighlighted = () => {
        return <input type={'text'}
            value={this.props.value}
            style={{ backgroundColor: '#DE622B' }}
            onChange={(e) => this.handleChange(e)} 
            onFocus={() => this.props.fireHighlight(this.props.position)}/>
    }
    renderBasic = () => {
        return <input type={'text'} value={this.props.value} onChange={(e) => this.handleChange(e)} onFocus={() => this.props.fireHighlight(this.props.position)} />
    }
    //highlited tiles have diffrent background, calculating related to highliting are in Boar component
    // Board Component returns boolean depending if Tile should or shouldn't be highlighted 
    render = () => {
        return this.props.highlighted ? this.renderHighlighted() : this.renderBasic();
    }
}
export default Tile;