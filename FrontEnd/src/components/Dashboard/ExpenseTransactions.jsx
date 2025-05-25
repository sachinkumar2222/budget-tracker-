import React from 'react'
import { LuArrowRight } from 'react-icons/lu'
import moment from 'moment'
import TransactionInfoCard from "../Cards/TransactionInfoCard"

const ExpenseTransactions = ({transaction, onSeeMore}) => {
  return (
    <div className='card'>
      <div className='flex items-center justify-between'>
        <h5 className='text-lg'>Expenses</h5>
        <button className='card-btn' onClick={onSeeMore}>
          See All <LuArrowRight className='text-base'/>
        </button>
      </div>
      
      <div className='mt-6'>
        {transaction?.slice(0,5)?.map((expense)=>(
          <TransactionInfoCard
            key={expense._id}
            title={expense.category}
            icon={expense.icon}
            amount={expense.amount}
            type="expense"
            hideDeleteBtn
            date={moment(expense.date).format("Do MMM YYYY")}
          />
        ))}
      </div> 
    </div>
  )
}

export default ExpenseTransactions