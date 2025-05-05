import { useBudget } from "../context/BudgetContext"
import { formatCurrency } from "../helpers"

type AmountProps = {
  label?: string,
  amount: number
}

const AmountDisplay = ({label, amount}: AmountProps) => {
  const {gastado, state} = useBudget()
  return (
    <p className='text-blue-600 font-bold text-2xl'>
      {label && `${label}:`}
      <span className={`font-black ${label === 'Disponible' && gastado > state.budget ? `text-red-500` : `text-black`}`}> {formatCurrency(amount)}</span>
    </p>
  )
}

export default AmountDisplay
