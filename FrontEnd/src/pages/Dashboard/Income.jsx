import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import IncomeOverView from "../../components/Income/IncomeOverView";
import Model from "../../components/Model";
import AddIncomeForm from "../../components/Income/AddIncomeForm";
import toast from "react-hot-toast";
import IncomeList from "../../components/Income/IncomeList";
import DeleteAlert from "../../components/DeleteAlert"
import { useUserAuth } from "../../hooks/useUserAuth";

const Income = () => {
  useUserAuth();
  
  const [incomeData, setIncomeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeletAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });
  const [openAddIncomeModel, setOpenAddIncomeModel] = useState(false);

  const fetchIncomeDetails = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await axiosInstance.get(
        `${API_PATHS.INCOME.GET_ALL_INCOME}`
      );

      if (response.data) {
        setIncomeData(response.data);
      }
    } catch (err) {
      console.log("Something went wrong. Please try again", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddIncome = async (income) => {
    const { source, amount, date, icon } = income;

    if (!source.trim()) {
      toast.error("Source is required!");
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
      await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, {
        source,
        amount,
        date,
        icon,
      });
      toast.success("Income added successfully!");
      fetchIncomeDetails(); 
      setOpenAddIncomeModel(false); 
    } catch (err) {
      console.error("Error adding income", err);
      toast.error("Failed to add income. Try again.");
    }
  };

  const deleteIncome = async (id) => {
    try{
      await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id));

      setOpenDeleteAlert({show: false, data: null})
      toast.success("Income details deleted successfully");
      fetchIncomeDetails();
    }catch(err){
      console.log("error deleting income",err);

    }

  };

  const handleDownloadIncomeDetails = async () => {};

  useEffect(() => {
    fetchIncomeDetails();
    return () => {};
  }, []);

  return (
    <DashboardLayout activeMenu="Income">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div>
            <IncomeOverView
              trancations={incomeData}
              onAddIncome={() => setOpenAddIncomeModel(true)}
            />
          </div>
        </div>

        <IncomeList
         trancations={incomeData}
         onDelete={(id)=>{
           setOpenDeleteAlert({show: true , data: id})
         }}
         onDownload= {handleDownloadIncomeDetails}
        />

        <Model
          isOpen={openAddIncomeModel}
          onClose={() => setOpenAddIncomeModel(false)}
          title="Add Income"
        >
          <AddIncomeForm onAddIncome={handleAddIncome} />
        </Model>

        <Model
         isOpen={openDeletAlert.show}
         onClose={()=> setOpenDeleteAlert({show : false, data:null})}
         title="delete income"
        >
          <DeleteAlert
           content = "Are you sure you want to delete this income details."
           onDelete = {() => deleteIncome(openDeletAlert.data)}
          />
        </Model>
      </div>
    </DashboardLayout>
  );
};

export default Income
