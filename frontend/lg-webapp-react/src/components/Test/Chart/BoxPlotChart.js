// BoxPlotChart.js
import React from 'react'
import { ResponsiveBoxPlot } from '@nivo/boxplot'

const BoxPlotChart = ({ data }) => {


  return (
    <div style={{ height: '400px' }}>
      <ResponsiveBoxPlot
        data={data}
        margin={{ top: 60, right: 140, bottom: 60, left: 60 }}
        minValue= 'auto'
        maxValue={100} // Adjust the maxValue as per your data
        groupBy="group" // Group by subgroup for multiple box plots
        groupMode="grouped"
        subGroupBy="subgroup"
        padding={0.12}
        enableGridX={true}
        axisTop={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: '',
          legendOffset: 36
        }}
        axisRight={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: '',
          legendOffset: 0
        }}
        // axisBottom={{
        //   tickSize: 5,
        //   tickPadding: 5,
        //   tickRotation: 0,
        //   legend: 'group',
        //   legendPosition: 'middle',
        //   legendOffset: 32
        // }}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'model-sample-brushType',
          legendPosition: 'middle',
          legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'value',
          legendPosition: 'middle',
          legendOffset: -40
        }}
        colors={{ scheme: 'nivo' }}
        borderRadius={2}
        borderWidth={2}
        borderColor={{
          from: 'color',
          modifiers: [
            [
              'darker',
              0.3
            ]
          ]
        }}
        medianWidth={2}
        medianColor={{
          from: 'color',
          modifiers: [
            [
              'darker',
              0.3
            ]
          ]
        }}
        whiskerEndSize={0.6}
        whiskerColor={{
          from: 'color',
          modifiers: [
            [
              'darker',
              0.3
            ]
          ]
        }}
        motionConfig="stiff"
        legends={[
          {
            anchor: 'right',
            direction: 'column',
            justify: false,
            translateX: 100,
            translateY: 0,
            itemWidth: 60,
            itemHeight: 20,
            itemsSpacing: 3,
            itemTextColor: '#999',
            itemDirection: 'left-to-right',
            symbolSize: 20,
            symbolShape: 'square',
            effects: [
              {
                on: 'hover',
                style: {
                  itemTextColor: '#000'
                }
              }
            ]
          }
        ]}
        // Custom axis definition
      />
    </div>
  )
}

export default BoxPlotChart
