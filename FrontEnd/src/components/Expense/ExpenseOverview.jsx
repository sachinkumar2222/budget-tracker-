import React, { useEffect, useState } from "react";
import { prepareExpeseLineChartData } from "../../utils/helper";
import { LuPlus } from "react-icons/lu";
import CustomLineChart from "../Charts/CustomLineChart";

const ExpenseOverview = ({ trancations, onAddExpense }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    console.log("exp2",trancations);
    const result = prepareExpeseLineChartData(trancations);
    setChartData(result);

  }, [trancations]);
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <div className="">
          <h5 className="text-lg">Expense Overview </h5>
          <p className="text-xs text-gray-400 mt-0.5">
            Track your spending trends over time and gain insights into where your money goes.
          </p>
        </div>

        <button className="add-btn" onClick={onAddExpense}>
          <LuPlus className="text-lg" />
          Add Expense
        </button>
      </div>

      <div className="mt-10">
        <CustomLineChart data={chartData} />
      </div>
    </div>
  );
};

export default ExpenseOverview;
