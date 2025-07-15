import React from 'react'

function DeleteAlertContent({ content, onDelete }) {
  return (
    <div className='p-6 max-w-md'>
      <p className='text-gray-700 text-base mb-6'>{content}</p>
      <div className='flex justify-end space-x-4'>
        <button
          type='button'
          className='px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-md shadow-sm transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 mr-4 mt-2'
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default DeleteAlertContent