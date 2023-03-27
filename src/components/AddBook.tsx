import React from 'react'
import { Link } from 'react-router-dom'
import AddIcon from '@mui/icons-material/Add';

const AddBook = () => {
    return (
        <Link to='/add' className='hover:bg-gray-200 text-[#27378C] flex items-center justify-center w-48 h-[20rem] rounded-xl border-dashed border-2 border-[#27378C]'>
            <div className='text-center'>
                <AddIcon className='mb-5' />
                <p className='underline'>Add a Book</p>
            </div>
        </Link>
    )
}

export default AddBook