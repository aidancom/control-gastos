import { useMemo } from 'react'
import { useBudget } from '../context/BudgetContext'
import ExpenseDetail from './ExpenseDetail'

const ExpenseList = () => {

  const {state} = useBudget()
  const filteredExpenses = state.currentCategory ? state.expenses.filter(category => category.category === state.currentCategory) : state.expenses
  const isEmpty = useMemo(() => filteredExpenses.length === 0 , [filteredExpenses])
  
  return (
    <div className='shadow-lg p-5 mt-10 rounded-lg'>
      {isEmpty ? 
       <p className='text-gray-600 text-2xl font-bold my-5'>No Hay Gastos</p>
      : (
        <>
          <p className='text-gray-600 text-2xl font-bold my-5'>Listado de Gastos</p>
          {filteredExpenses.map(expense => (
            <ExpenseDetail key={expense.id} expense={expense}/>
          ))}
        </>
      )
      }
    </div>
  )
}

export default ExpenseList
