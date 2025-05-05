import { categories } from "../db/categories"
import DatePicker from "react-date-picker"
import 'react-calendar/dist/Calendar.css'
import 'react-date-picker/dist/DatePicker.css'
import { useEffect, useState } from "react"
import { DraftExpense, Value } from "../types"
import ErrorMessage from "./ErrorMessage" 
import { useBudget } from "../context/BudgetContext"




const ExpenseForm = () => {

  

  const [error, setError] = useState('')
  const [expense, setExpense] = useState<DraftExpense>({
    amount: 0,
    name: '',
    category: '',
    date: new Date()
  })
  const {dispatch, state} = useBudget()

  useEffect(() => {
    if (state.editingId) {
      const editingExpense = state.expenses.filter(expense => expense.id === state.editingId)[0]
      setExpense(editingExpense)
    }
  }, [state.editingId])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
   const {name, value} = e.target
   const isAmountField = ['amount'].includes(name)
   setExpense({...expense, [name]: isAmountField ? parseInt(value) : value })
  }

  const handleChangeDate = (value: Value) => {
    setExpense({...expense, date: value})
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(Object.values(expense).includes('')) {
      console.log(Object.keys(expense))
      setError("Todos los campos son obligatorios")
      return
    }
    if (state.editingId) {
      dispatch({type: 'update-expense', payload: {expense: {id: state.editingId, ...expense}}})
    } else {
      dispatch({type: 'add-expense', payload: {expense}})
    }
    
    setExpense({
      amount: 0,
      name: '',
      category: '',
      date: new Date()
    }) 
  }

  return (
    <>
      <form className='space-y-5' onSubmit={handleSubmit}>
        <legend className='uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2'>{state.editingId ? 'Editar Gasto' : 'Nuevo Gasto'}</legend>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <div className='flex flex-col gap-2'>
          <label htmlFor="name" className='text-xl'>Nombre Gasto:</label>
          <input type="text" name="name" id="name" placeholder="Añade el nombre del gasto" onChange={handleChange} value={expense.name} className="bg-slate-200 p-2"/>
        </div>
        <div className='flex flex-col gap-2'>
          <label htmlFor="amount" className='text-xl'>Cantidad:</label>
          <input type="number" name="amount" onChange={handleChange} id="amount"  placeholder="Añade la cantidad del gasto: ej. 300" value={expense.amount} className="bg-slate-200 p-2"/>
        </div>
        <div className='flex flex-col gap-2'>
          <label htmlFor="category" className='text-xl'>Categoría:</label>
          <select defaultValue={''} name="category" id="category" onChange={handleChange} className="bg-slate-200 p-2">
            <option disabled={true} value=''>Seleccione una opcion</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
        </div>
        <div className='flex flex-col gap-2'>
          <label htmlFor="datePicker" className='text-xl'>Fecha gasto:</label>
          <DatePicker value={expense.date} onChange={handleChangeDate} className="bg-slate-100 p-2 border-0"/>
        </div>
        <input type="submit" value={state.editingId ? 'Guadar cambios' : 'Registrar Gasto'} className="bg-blue-600 cursor-pointer w-full p-2 rounded-lg font-bold uppercase text-white"/>
      </form>
    </>
  )
}

export default ExpenseForm
