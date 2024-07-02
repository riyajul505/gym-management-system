import React, { useEffect, useState } from "react";
import { IoMdDoneAll } from "react-icons/io";
import { useLoaderData } from "react-router-dom";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const AdminPayment = () => {
    const axiosSecure = useAxiosSecure();
    const [chartData, setChartData] = useState([]);
    console.log(chartData, 'dddd')
    useEffect(()=>{
        axiosSecure.get('/paid-and-newsletter')
        .then(res=> setChartData(res.data))
    },[axiosSecure])
  const data = [
    {
      name: "Newsletter",
      subscriber: 5,
    },
    {
      name: "Paid",
      subscriber: 2,
    }
  ];
  const paymentSummary = useLoaderData();
  const { totalAmount, lastPayments } = paymentSummary;
  console.log(totalAmount);
  return (
    <div>
      <h1 className="text-2xl">Payment Summary</h1>
      <div>
        <div className="flex flex-col lg:flex-row justify-around">
          <div className="w-1/2">
            <div className="stats shadow">
              <div className="stat">
                <div className="stat-title">Total Revenue</div>
                <div className="stat-value">${totalAmount}</div>
              </div>
            </div>
          </div>
          {/* bar chart */}
          <div className="w-1/2">
            <ResponsiveContainer width={250} height={200}>
              <BarChart
                width={500}
                height={500}
                data={chartData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis dataKey={'subscriber'} />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="subscriber"
                  fill="#8884d8"
                  activeBar={<Rectangle fill="pink" stroke="blue" />}
                />
                {/* <Bar
                //   dataKey="subscriber"
                  fill="#82ca9d"
                  activeBar={<Rectangle fill="gold" stroke="purple" />}
                /> */}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* last 6 transaction */}
      <div className="container p-2 mx-auto sm:p-4 text-gray-800">
        <h2 className="mb-4 text-2xl font-semibold leading-tight">
          Recent Invoices
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <colgroup>
              <col />
              <col />
              <col />
              <col />
              <col />
              <col className="w-24" />
            </colgroup>
            <thead className="bg-gray-300">
              <tr className="text-left">
                <th className="p-3">Invoice no#</th>
                <th className="p-3">User Email</th>
                <th className="p-3 text-right">Amount</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {lastPayments.map((payment) => (
                <tr
                  key={payment._id}
                  className="border-b border-opacity-20 border-gray-300 bg-gray-50"
                >
                  <td className="p-3">
                    <p>{payment._id}</p>
                  </td>
                  <td className="p-3">
                    <p>{payment.userEmail}</p>
                  </td>
                  <td className="p-3 text-right">
                    <p>${payment.amount}</p>
                  </td>
                  <td className="p-3">
                    <span className="text-center text-xl">
                      <IoMdDoneAll />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPayment;
