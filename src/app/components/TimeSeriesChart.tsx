import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Text,
  ResponsiveContainer,
} from 'recharts';
import moment from 'moment';

const TimeSeriesChart = (props: { data: { x: number; y: number }[] }) => {
  const firstDate = props.data[0].x;
  const lastDate = props.data[props.data.length - 1].x;

  const firstDateTime = moment(firstDate);
  const lastDateTime = moment(lastDate);
  let format = 'Do MMM';
  const diff = lastDateTime.diff(firstDateTime, 'days');
  if (diff < 2) {
    format = 'Do MMM, H:mm A';
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart width={500} height={300} data={props.data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="x"
          domain={[firstDate, lastDate]}
          interval={'preserveStartEnd'}
          type={'number'}
          scale={'time'}
          padding={{ left: 20, right: 20 }}
          style={{
            fontSize: '0.8rem',
          }}
          tickFormatter={x => moment(x).format(format)}
          tickMargin={10}
        />
        <YAxis
          style={{
            fontSize: '0.8rem',
          }}
          label={
            <Text
              x={-25}
              y={0}
              dx={50}
              dy={150}
              offset={0}
              angle={-90}
              fontSize={'0.8rem'}
            >
              Count
            </Text>
          }
        />
        <Tooltip
          labelFormatter={p => {
            return moment(p).format(format);
          }}
          label={'Count'}
        />
        <Line
          type="monotone"
          dataKey="y"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default TimeSeriesChart;
