import BudgetForm from "./components/BudgetForm"
import BudgetTracker from "./components/BudgetTracker"
import { useBudget } from "./context/BudgetContext"
import ExpenseModal from "./components/ExpenseModal"
import ExpenseList from "./components/ExpenseList"
import { useEffect } from "react"
import FilterByCategory from "./components/FilterByCategory"


function App() {
  const {state} = useBudget()

  useEffect(() => {
    localStorage.setItem('budget', state.budget.toString())
    localStorage.setItem('expenses', JSON.stringify(state.expenses))
  }, [state])

  
  return (
    <>
      <header className="bg-blue-600 py-8 max-h-72">
        <h1 className="uppercase text-center font-black text-4xl text-white">Planificador de gastos</h1>
      </header>
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg mt-10 p-10">
        {!state.budget ? <BudgetForm/> : <BudgetTracker/>}
      </div>
      {state.budget ? <main className="max-w-3xl mx-auto py-10"><FilterByCategory/><ExpenseList/><ExpenseModal/></main> : ''}
    </>
  )
}

export default App
