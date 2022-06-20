import React from 'react'

const DataList = ({ item, index }) => {
    const formatedate = (date) => {
        var formatedDate = new Date(date);
        formatedDate = formatedDate.getDate() + "-" + parseInt(formatedDate.getMonth() + 1) + "-" + formatedDate.getFullYear();
        return formatedDate;
    }
  return (
      <div className='data-list' key={index}>
        <h2>{item.title}</h2>
        <p>Author: {item.author}</p>
        <p>Created on: {formatedate(item.created_at)}</p>
      </div>
  )
}

export default DataList