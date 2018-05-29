import React, { Component } from 'react';
import Tile from './Tile';
class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            highlightSource: {
                row: '',
                column: '',
                block: ''
            }
        };
    }
    updateTile = (id, value) => {
        this.props.update(id, value);
    }
    getBlock = (id) => {
        if ((id >= 0 && id <= 2) || (id >= 9 && id <= 11) || (id >= 18 && id <= 20))
            return (0);
        if ((id >= 3 && id <= 5) || (id >= 12 && id <= 14) || (id >= 21 && id <= 23))
            return (1);
        if ((id >= 6 && id <= 8) || (id >= 15 && id <= 17) || (id >= 24 && id <= 26))
            return (2);
        if ((id >= 27 && id <= 29) || (id >= 36 && id <= 38) || (id >= 45 && id <= 47))
            return (3);
        if ((id >= 30 && id <= 32) || (id >= 39 && id <= 41) || (id >= 48 && id <= 50))
            return (4);
        if ((id >= 33 && id <= 35) || (id >= 42 && id <= 44) || (id >= 51 && id <= 53))
            return (5);
        if ((id >= 54 && id <= 56) || (id >= 63 && id <= 65) || (id >= 72 && id <= 74))
            return (6);
        if ((id >= 57 && id <= 59) || (id >= 66 && id <= 68) || (id >= 75 && id <= 77))
            return (7);
        return (8);

    }
    shouldBeHighlighted = (index) => {
        const highlightSource = this.state.highlightSource;
        const tilePosition = this.getTilePosition(index);
        if (highlightSource.block === tilePosition.block || highlightSource.column === tilePosition.column || highlightSource.row === tilePosition.row)
            return true;
        return false;
    }
    getTilePosition = (index) => {
        const position = {
            row: parseInt(index / 9),
            column: index % 9,
            block: this.getBlock(index)
        }
        return position;
    }
    getHighlightSource = (tilePosition) => {
        this.setState({ highlightSource: tilePosition });
    }
    renderHighlighted = (index, value) => {
        return <Tile
            key={index}
            id={index}
            value={value}
            position={this.getTilePosition(index)}
            fireHighlight={this.getHighlightSource}
            highlighted={true}
            update={this.updateTile} />
    }
    renderBasic = (index, value) => {
            return <Tile
                key={index}
                id={index}
                value={value}
                position={this.getTilePosition(index)}
                fireHighlight={this.getHighlightSource}
                update={this.updateTile} />
    }
    render = () =>
        this.props.board.map(
            (value, index) => {
                if (this.shouldBeHighlighted(index))
                    return this.renderHighlighted(index, value);
                return this.renderBasic(index, value);
            });

};
export default Board;