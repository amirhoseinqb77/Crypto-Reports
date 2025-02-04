import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import axios from 'axios';

const CryptoReport = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://min-api.cryptocompare.com/data/v2/histohour',
          {
            params: {
              fsym: 'BTC',
              tsym: 'USD',
              limit: 10,
            },
          }
        );
        const formattedData = response.data.Data.Data.map((item, index) => ({
          time: `Time ${index + 1}`,
          low: item.low,
          high: item.high,
          avg: (item.low + item.high) / 2,
        }));
        setData(formattedData);
      } catch (err) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="text-center text-lg">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-center text-2xl font-bold mb-6">Crypto Reports</h1>
      <BarChart
        width={800}
        height={400}
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="low" fill="#8884d8" name="Low" />
        <Bar dataKey="avg" fill="#82ca9d" name="Average" />
        <Bar dataKey="high" fill="#ffc658" name="High" />
      </BarChart>
    </div>
  );
};

export default CryptoReport;
