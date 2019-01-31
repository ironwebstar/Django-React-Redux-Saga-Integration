import React from 'react';
import PropTypes from 'prop-types';

import {
  LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ReferenceLine, ResponsiveContainer,
}
  from 'recharts';

import getRandomColor from '../../helpers/colorHelper.js'

/*
required Props:
  data: 
  idealPlan: 

  data =>
  this is used for visualzing barChart data
  prop-type = array
  sampleData = [
    { name: "Jan", Group1: 4000, Group2: 2400, Group3: 2400, Group4: 2400 },
    { name: "Feb", Group1: 3000, Group2: 1398, Group3: 2210, Group4: 2210 },
    { name: "Mar", Group1: 2000, Group2: 9800, Group3: 2290, Group4: 2290 },
  ];
  idealPlan =>
  this is the plan we should do
  prop-type = number
  */

export default function AdminLineChart(props) {

  const { data, idealPlan } = props;
  const dataKeyList = Object.keys(data[0]);
  const dataKeyCandidate = dataKeyList.slice(1);
  
  return (
    <ResponsiveContainer>
      <LineChart data={data} margin={{ top: 5, right: 30, left: 10, bottom: 5 }}>
        <XAxis dataKey={dataKeyList[0]} />
        <YAxis label={{ value: '', angle: -90, position: 'insideLeft' }} />
        <Tooltip />
        <Legend />
        <CartesianGrid strokeDasharray="3 3" />
        <ReferenceLine y={idealPlan} stroke="red" strokeDasharray="10 3" />
        {
          dataKeyCandidate.map((dataKey, index) => {
            const stringifiedKey = `${dataKey}`;
            return(
              <Line key={index.toString()} type="monotone" dataKey={stringifiedKey} stroke={getRandomColor()} strokeWidth={1.4} dot={false} />
            )
          })
        }
      </LineChart>
    </ResponsiveContainer>
  );
}

AdminLineChart.propTypes = {
  data: PropTypes.array,
  idealPlan: PropTypes.number
};
AdminLineChart.defaultProps = {
  data: [ {name: 'No Data'} ],
  idealPlan: 3000,
};