import { useReducer, createContext, ActionDispatch, ReactNode, useContext  } from "react"
import { BudgetActions, BudgetState, initialState, reducer } from "../reducers/budget-reducer"

type BudgetContextProps = {
  state: BudgetState,
  dispatch: ActionDispatch<[action: BudgetActions]>,
  gastado: number,
  disponible: number
}

type BudgetProviderProps = {
  children: ReactNode
}

export const BudgetContext = createContext<BudgetContextProps>(null!)

export const BudgetProvider = ({children}: BudgetProviderProps) => {

  const [state, dispatch] = useReducer(reducer, initialState)

  const gastado = state!.expenses.reduce((acc, item) => acc + item.amount, 0)
  const disponible = state!.budget - gastado!

  return (
    <BudgetContext.Provider value={{state, dispatch, gastado, disponible}}>
      {children}
    </BudgetContext.Provider>
  )
}

export const useBudget = () => {
  const context = useContext(BudgetContext);
  if (!context) {
    throw new Error('useBudget must be used within a BudgetProvider');
  }
  return context;
};