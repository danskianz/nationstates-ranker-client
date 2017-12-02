import React, { Component } from 'react';
import { Table, Button } from 'react-bootstrap';

class CurrentRankings extends Component {
    
    constructor() {
        super();
        this.state = {
            isLoading: true,
            data: {}
        };
        this.getUpdatedRankings = this.getUpdatedRankings.bind(this);
    }
    
    componentWillMount() {
        var url = 'http://localhost:8080/ranker/nationstates/leaderboard/regions/northern_redlands?fetch=CACHED';
        fetch(url)
        .then(results => results.json())
        .then((standings) => {
            this.setState({
                isLoading: false,
                data: {
                    region: 'northern_redlands',
                    nations: standings
                }});
        }).catch(error => {
            console.error(error);
        });
    }
    
    getUpdatedRankings() {
        this.setState({
            isLoading: true,
            data: {}
        });
        
        var url = 'http://localhost:8080/ranker/nationstates/leaderboard/regions/northern_redlands?fetch=REALTIME';
        fetch(url)
        .then(results => results.json())
        .then((standings) => {
            this.setState({
                isLoading: false,
                data: {
                    region: 'northern_redlands',
                    nations: standings
                }});
        }).catch(error => {
            console.error(error);
        });
    }
    
    render() {
        
        if (this.state.isLoading) {
            return (
                <div className="CurrentRankings">
                    <h2>Loading Rankings...</h2>
                </div>
            );
        }
        
        const renderNation = function (nation, list) {
            return (
                <tr key={nation}>
                    <td>{nation}</td>
                    <td>{list[nation]}</td>
                </tr>
            );
        };
        
        
        var rankings = this.state.data.nations;
        var sortedKeys = Object.keys(rankings);
        sortedKeys.sort((a, b) => rankings[b] - rankings[a]);
        
        return (
            <div className="CurrentRankings">
                <h2>Rankings for the Region of {this.state.data.region}</h2>
                <Button onClick={this.getUpdatedRankings} bsStyle="success">
                    Get Updated Rankings
                </Button>
                <Table striped bordered condensed hover>
                    <thead>
                        <tr>
                            <th>Nation</th>
                            <th>Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedKeys.map((key) => renderNation(key, rankings))}
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default CurrentRankings;