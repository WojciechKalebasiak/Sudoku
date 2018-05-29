import React from 'react';
import '../styles/levels.css';
const GameSettings = props => {
    return (
        <div className={'levelsList'}>
            <div className={'level easy'} onClick={() => props.setLevel('easy')}>
                <h2 className={'level-header'}>Easy</h2>
                <div className={'levelbar'}></div>
            </div>
            <div className={'level medium'} onClick={()=>props.setLevel('medium')}>
                <h2 className={'level-header'}>Medium</h2>
                <div className={'levelbar'}></div>
            </div>
            <div className={'level hard'} onClick={()=>props.setLevel('hard')}>
                <h2 className={'level-header'}>Hard</h2>
                <div className={'levelbar'}></div>
            </div>
            <div className={'level veryHard'} onClick={()=>props.setLevel('very-hard')}>
                <h2 className={'level-header'}>Very hard</h2>
                <div className={'levelbar'}></div>
            </div>
            <div className={'level insane'} onClick={()=>props.setLevel('insane')}>
                <h2 className={'level-header'}>Insane</h2>
                <div className={'levelbar'}></div>
            </div>
            <div className={'level inhuman'} onClick={()=>props.setLevel('inhuman')}>
                <h2 className={'level-header'}>Inhuman</h2>
                <div className={'levelbar'}></div>
            </div>
        </div>
    );
}
export default GameSettings;