import React, { useEffect, useState } from 'react';
import { Filter } from '../Filter';
import { Pagination } from '../Pagination';
import { ProductCard } from '../ProductCard';
import { Item } from '../ProductCard/models';
import './styles.css'
export function ProductList() {

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const isMobile = screenWidth <= 500;
  const [data, setData] = useState([]);
  const [selectedValue, setSelectedValue] = useState('');  
  const [paginationValue, setPaginationValue] = useState('');
  useEffect(() => {
    fetch("./api/cars.json").then(
      (res) => {
        return res.json()
      }).then((data) => {
        setData(data);
      }).catch((error) => {
        throw new Error(error.message);
      }
      )
  }, []);
  const [limit, setLimit] = useState(0);
  const filteredValues = !selectedValue ? data : data.filter((car: any) => car.bodyType.toLowerCase().includes(selectedValue.toLowerCase()));
  const types = data.map((item: any) => item.bodyType);
  const typesArr = types.filter((data,index)=>{
    return types.indexOf(data) === index;
  })

  const show = !paginationValue ? data.slice(0,1) :  data.filter((car: any) => car.id.toLowerCase().includes(paginationValue.toLowerCase()));

  const handleNext = () => {
    if (limit < 4) {
      setLimit(prev => prev + 1);
    }
  }
  const handlePrevious = () => {
    if (limit > 0) {
      setLimit(prev => prev - 1);
    }
  }

  return (
    <main className='main-container'>
      <Filter values={typesArr} selectedValue={selectedValue} setSelectedValue={setSelectedValue} />      
      
      <ul className='product-list'>
        {filteredValues && !isMobile ? filteredValues.slice(limit, limit + 4).map((item: Item, index: number) => (
          <li key={index}><ProductCard item={item} /></li>
        )) :
          show && show.map((item: Item, index: number) => (
            <li key={index}><ProductCard item={item} /></li>
          ))
        }
      </ul>
      {!isMobile ?
      <div className='button-container'>
        <button onClick={handlePrevious} disabled={limit === 0}><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-arrow-left-circle" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z" />
        </svg></button>
        <button onClick={handleNext} disabled={limit === 4}><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-arrow-right-circle" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
        </svg></button>
      </div>
      : <Pagination data={data} paginationValue={paginationValue} setPaginationValue={setPaginationValue}/>}
    </main>
  )
}
