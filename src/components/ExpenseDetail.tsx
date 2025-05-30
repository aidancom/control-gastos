import { useMemo } from 'react'
import '../styles/swipe.css'
import { Expense } from '../types'
import { formatDate } from '../helpers'
import AmountDisplay from './AmountDisplay'
import { categories } from '../db/categories'
import {LeadingActions, SwipeableList, SwipeableListItem, SwipeAction, TrailingActions} from 'react-swipeable-list'
import 'react-swipeable-list/dist/styles.css'
import { useBudget } from '../context/BudgetContext'

type ExpenseDetailProps = {
  expense: Expense
}

const ExpenseDetail = ({expense}: ExpenseDetailProps) => {

  const {dispatch} = useBudget()

  const categoryInfo = useMemo(() => categories.filter(cat => cat.id === expense.category)[0], [expense])
  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction onClick={() => dispatch({type: 'get-expense-by-id', payload: {id: expense.id}})}>
        Actualizar
      </SwipeAction>
    </LeadingActions>
  )
  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction destructive onClick={() => dispatch({type: 'remove-expense', payload: expense.id})}>
        Eliminar
      </SwipeAction>
    </TrailingActions>
  )

  return (
    <SwipeableList>
      <SwipeableListItem maxSwipe={1} leadingActions={leadingActions()} trailingActions={trailingActions()}>
        <div className='bg-white shadow-lg p-10 w-full border-b border-gray-200 flex gap-5 items-center'>
          <div>
            <img src={`/icono_${categoryInfo.icon}.svg`} alt={`icono ${categoryInfo.icon}`} className='w-20' />
          </div>
          <div className='flex-1 space-y-2'>
            <p className='text-sm font-bold uppercase text-slate-500'>{categoryInfo.name}</p>
            <p>{expense.name}</p>
            <p className='text-slate-600 text-sm'>{formatDate(expense.date!.toString())}</p>
          </div>
          <AmountDisplay amount={expense.amount}/>
        </div>
      </SwipeableListItem>
    </SwipeableList>
  )
}

export default ExpenseDetail
