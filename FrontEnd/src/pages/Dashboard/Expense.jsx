import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import { useUserAuth } from '../../hooks/useUserAuth';
import toast from 'react-hot-toast';
import Model from "../../components/Model";
import { API_PATHS } from '../../utils/apiPaths';
import axiosInstance from '../../utils/axiosInstance';
import ExpenseOverview from '../../components/Expense/ExpenseOverview';
import AddExpenseForm from '../../components/Expense/AddExpenseForm';

const Expense = () => {
  useUserAuth();

  const [expenseData, setExpenseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeletAlert, setOpenDeleteAlert] = useState({
      show: false,
      data: null,
  });
  const [openAddExpenseModel, setOpenAddExpenseModel] = useState(false);

   const fetchExpenseDetails = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await axiosInstance.get(
        `${API_PATHS.EXPENSE.GET_ALL_EXPENSE}`
      );

      if (response.data) {
        setExpenseData(response.data.expense);
      }
    } catch (err) {
      console.log("Something went wrong. Please try again", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddExpense = async (expense) => {
    const { category, amount, date, icon } = expense;

    if (!category.trim()) {
      toast.error("category is required!");
      return;
    }

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Amount should be a valid number greater than 0.");
      return;
    }

    if (!date) {
      toast.error("Date is required!");
      return;
    }

    try {
      await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
        category,
        amount,
        date,
        icon,
      });
      toast.success("Expense added successfully!");
      fetchIncomeDetails(); 
      setOpenAddExpenseModel(false); 
    } catch (err) {
      console.error("Error adding expense", err);
      toast.error("Failed to add expense. Try again.");
    }
  };

  useEffect(()=>{
    fetchExpenseDetails();

    return () => {}
  },[])

  return (
     <DashboardLayout activeMenu='Expense'>
      <div className='my-5 mx-auto'>
        <div className="grid grid-cols-1 gap-6">
          <div className="">
            <ExpenseOverview
              trancations={expenseData}
              onAddExpense={() => setOpenAddExpenseModel(true)}
            />  
          </div>
        </div>

        <Model
         isOpen={openAddExpenseModel}
         onClose={() => setOpenAddExpenseModel(false)}
         title="Add Expense"
        >
          <AddExpenseForm onAddExpense={handleAddExpense}/>
        </Model>
      </div>
    </DashboardLayout>
  )
}

export default Expense