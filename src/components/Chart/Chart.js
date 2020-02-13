import React, { Component } from 'react';
import axios from 'axios';
import './Chart.css';
import { VictoryLine, VictoryChart, VictoryTooltip } from 'victory';

export class Chart extends Component {

    state = { dataChart: [], title: '', description: '', yaxisLabel: '' }

    componentDidMount() {

        axios.get("http://localhost:3001/appData")
            .then(res => {
                let arrayChart = [];
                res.data.chartPage.data.forEach(element => {
                    arrayChart.push({ x: `${element.year}`, y: element.value, label: `${element.value}` })
                });

                const title = res.data.chartPage.title;
                const description = res.data.chartPage.description;
                const yaxisLabel = res.data.chartPage.yAxisLabel;
                console.log(title);
                console.log(description);
                console.log(yaxisLabel);
                return this.setState({ dataChart: arrayChart, title, description, yaxisLabel })
            })
    }

    render() {
        const {title, description, yaxisLabel} = this.state;

        return (
            <div className="wrapp-chart">
                <div className="container-title-chart">
                    <span className="title-chart">{title}</span>
                </div>
                <div className="container-description">
                    <span className="description-chart">{description}</span>
                </div>
                <div className="container-chart">
                    <VictoryChart>
                        <VictoryLine
                            labelComponent={<VictoryTooltip />} data={this.state.dataChart} style={{
                                data: {
                                    stroke: "#02B875"
                                }
                            }}
                        />
                    </VictoryChart>
                </div>

            </div>

        )
    }
}

export default Chart
