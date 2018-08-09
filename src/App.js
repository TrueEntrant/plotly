import React, { Component } from 'react';
import Plot from 'react-plotly.js';

class App extends Component {

  state = {
    speed : ''
  }


  onChange(e) {
    this.setState({
      speed : e.target.value
    })
  }

  render() {
    // Trig to calc meter point
    const degrees = 180 - this.state.speed;
    const radius = .5;
    const radians = degrees * Math.PI / 180;
    const x = radius * Math.cos(radians);
    const y = radius * Math.sin(radians);
    
    // Path: may have to change to create a better triangle
    const mainPath = 'M -.0 -0.025 L .0 0.025 L ';
    const pathX = String(x);
    const space = ' ';
    const pathY = String(y);
    const pathEnd = ' Z';
    const path = mainPath.concat(pathX,space,pathY,pathEnd);

    return (
      <div>
      <Plot
        data={[
          {
            type: 'scatter',
            x: [0], y:[0],
            marker: {size: 28, color:'850000'},
            showlegend: false,
            name: 'speed',
            text: this.state.speed,
            hoverinfo: 'text+name'
          },
          { 
            values: [50/6, 50/6, 50/6, 50/6, 50/6, 50/6, 50],
            rotation: 90,
            text: ['TOO FAST!', 'Pretty Fast', 'Fast', 'Average',
                'Slow', 'Super Slow', ''],
            textinfo: 'text',
            textposition:'inside',	  
            marker: {colors:['rgba(14, 127, 0, .5)', 'rgba(110, 154, 22, .5)',
                        'rgba(170, 202, 42, .5)', 'rgba(202, 209, 95, .5)',
                        'rgba(210, 206, 145, .5)', 'rgba(232, 226, 202, .5)',
                        'rgba(255, 255, 255, 0)']},
            labels: ['151-180', '121-150', '91-120', '61-90', '31-60', '0-30', ''],
            hoverinfo: 'label',
            hole: .5,
            type: 'pie',
            showlegend: false
          }
        ]}

        layout={ { 
          shapes:[{
            type: 'path',
            path: path,
            fillcolor: '850000',
            line: {
              color: '850000'
            }
          }],
          title: '<b>Gauge</b> <br> Speed 0-100',
          height: 1000,
          width: 1000,
          xaxis: {
            zeroline:false, showticklabels:false,
            showgrid: false, range: [-1, 1]
          },
          yaxis: {
            zeroline:false, 
            showticklabels:false,
            showgrid: false, range: [-1, 1]
          }
        } }
      />

      <input type="text" value={this.state.speed} onChange={(event) => this.onChange(event)} placeholder='Input speed here...'/>
      </div>
    );
  }
}

export default App;
