import React from 'react'

const CategoryForm = ({handelSubmit,value,setValue}) => {
    
  return (
    <>
  <form type='submit' onSubmit={handelSubmit}>
  <div className="mb-3">
    <input type="text" className="form-control" placeholder='Enter New category'
     value={value} 
     onChange={(e) => setValue(e.target.value)} />
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>

    </>
  )
}

export default CategoryForm