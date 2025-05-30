import React from 'react'
import { categories } from '../db/categories'
import { useBudget } from '../context/BudgetContext'

const FilterByCategory = () => {

  const {dispatch} = useBudget()

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({type: 'add-filter-category', payload: {id: e.target.value}})
  }

  return (
    <div className='bg-white shadow-lg rounded-lg p-10'>
      <form action="">
        <div className='flex flex-col md:flex-row md:items-center gap-5'>
          <label htmlFor="category">Filtrar por categorias</label>
          <select onChange={handleChange} name="category" id="category" className='bg-slate-100 p-3 flex-1 rounded'>
            <option value="">Todas las categorias</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
        </div>
      </form>
    </div>
  )
}

export default FilterByCategory
