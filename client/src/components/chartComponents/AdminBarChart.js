import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';

import getRandomColor from '../../helpers/colorHelper.js';

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
// const data = [
//   { name: 'Jan', Group1: 4000, Group2: 2400, Group3: 2400, Group4: 2400 },
//   { name: 'Feb', Group1: 3000, Group2: 1398, Group3: 2210, Group4: 2210 },
//   { name: 'Mar', Group1: 2000, Group2: 9800, Group3: 2290, Group4: 2290 },
// ];

export default function AdminBarChart(props) {
  const { data, idealPlan } = props;
  const dynamicDataKey = Object.keys(data[0]);
  const dataKeyCandidate = dynamicDataKey.slice(1);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={dynamicDataKey[0]} />
        <YAxis />
        <Tooltip />
        <Legend />
        <ReferenceLine y={idealPlan} stroke="red" strokeDasharray="10 3" />
        {dataKeyCandidate.map((item, index) => {
          const stringItem = `${item}`;
          return (
            <Bar
              dataKey={stringItem}
              key={index.toString()}
              fill={getRandomColor()}
            />
          );
        })}
      </BarChart>
    </ResponsiveContainer>
  );
}

AdminBarChart.propTypes = {
  data: PropTypes.array,
  idealPlan: PropTypes.number,
};
AdminBarChart.defaultProps = {
  data: [{ name: 'No Data' }],
  idealPlan: 3000,
};
