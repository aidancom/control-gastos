import { useMemo, useState } from "react"
import { useBudget } from "../context/BudgetContext"


const BudgetForm = () => {
  const [budget, setBudget] = useState(0)
  const {dispatch} = useBudget()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBudget(parseInt(e.target.value))
  }

  const isValid = useMemo(() => isNaN(budget) || budget <= 0, [budget])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch({type: 'add-budget', payload: {budget}})
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="flex flex-col space-y-5">
        <label htmlFor="budget" className="text-4xl text-blue-600 font-bold text-center">Definir presupuesto</label>
        <input 
          type="number"
          id="budget"
          name="budget"
          className="w-full bg-white border border-gray-200 p-2"
          placeholder="Define tu presupuesto"
          value={budget}
          onChange={handleChange}
        />
      </div>
      <input 
        type="submit"
        value="Definir presupuesto"
        className="bg-blue-600 hover:bg-blue-700 cursor-pointer w-full font-black p-2 uppercase text-white disabled:opacity-10"
        disabled={isValid}
      />
    </form>
  )
}

export default BudgetForm
