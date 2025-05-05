import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import AmountDisplay from './AmountDisplay'
import { useBudget } from '../context/BudgetContext'
import 'react-circular-progressbar/dist/styles.css'

const BudgetTracker = () => {
  const {state, gastado, disponible, dispatch} = useBudget()
  const percentage = parseFloat(((gastado / state.budget) * 100).toFixed(2))

  const handleReste = () => {
    dispatch({type: 'reset-app'})
    console.log(state.expenses)
  }
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
      <div className='flex justify-center'>
        <CircularProgressbar 
          value={percentage}
          text={percentage + '%'}
          styles={buildStyles({
            pathColor: '#155DFC',
            trailColor: '#f5f5f5',
            textSize: 15,
            textColor: '#4A5565'
          })} 

        />
      </div>
      <div className='flex flex-col justify-center items-center gap-8'>
        <button type='button' className='bg-pink-500 text-white w-full uppercase rounded-lg font-bold p-2' onClick={handleReste}>Resetear App</button>
        <AmountDisplay label='Presupuesto' amount={state.budget}/>
        <AmountDisplay label='Disponible' amount={disponible}/>
        <AmountDisplay label='Gastado' amount={gastado}/>
      </div>
    </div>
  )
}

export default BudgetTracker
