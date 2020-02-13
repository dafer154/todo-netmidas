import React, { Component } from 'react';
import axios from 'axios';
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
                return this.setState({ dataChart: arrayChart, title, description, yaxisLabel })
            })
    }

    render() {
        return (
            <VictoryChart>
                
                <VictoryLine
                    labelComponent={<VictoryTooltip/>} data={this.state.dataChart} style={{
                        data: {
                            stroke: "#02B875"
                        }
                    }}
                />
            </VictoryChart>
        )
    }
}

export default Chart
