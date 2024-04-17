import React, { Component } from 'react'
import dynamic from 'next/dynamic'

const DynamicChart = dynamic(() => import('react-apexcharts'), { ssr: false })

class Chart extends Component {
  render() {
    const { options, series, type, width, name } = this.props

    return (
      <div className='mixed-chart border-black'>
        {name && <h2 className='text-center'>{name}</h2>}
        <DynamicChart
          options={options}
          series={series}
          type={type}
          width={width}
        />
      </div>
    )
  }
}

export default Chart
