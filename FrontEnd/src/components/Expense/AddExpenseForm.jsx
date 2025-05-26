import { useState } from "react";
import EmojiPickerPopup from "../EmojiPickerPopup";
import Input from "../Inputs/Input"

const AddExpenseForm = ({ onAddExpense }) => {
  const [expense, setExpense] = useState({
    category: "",
    amount: "",
    date: "",
    icon: "",
  });

  const handleChange = (key, value) =>
    setExpense({ ...expense, [key]: value });

  const handleSubmit = () => {
    onAddExpense(expense);
    setExpense({ category: "", amount: "", date: "", icon: "" }); 
  };

  return (
    <div>
     
      <EmojiPickerPopup
        icon={expense.icon}
        onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
      />

   
      <Input
        value={expense.category}
        onChange={({ target }) => handleChange("category", target.value)}
        label="Expense category"
        placeholder="Rent,Groceries etc"
        type="text"
      /> 

  
      <Input
        value={expense.amount}
        onChange={({ target }) => handleChange("amount", target.value)}
        label="Amount"
        type="number"
      />

  
      <Input
        value={expense.date}
        onChange={({ target }) => handleChange("date", target.value)}
        label="Date"
        type="date"
      />

      
      <div className="flex justify-end mt-6">
        <button
          type="button"
          className="add-btn add-btn-fill"
          onClick={handleSubmit}
        >
          Add Expense
        </button>
      </div>
    </div>
  );
};

export default AddExpenseForm;

