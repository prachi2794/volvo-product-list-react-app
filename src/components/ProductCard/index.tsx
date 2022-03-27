import React from 'react';
import { Item } from './models';
import './styles.css';
export function ProductCard(props: { item: any }) {
  return (
    <div className='product-card'>
      <div className='product-details'>
        <p>{props?.item?.bodyType}</p>
        <p>
          <span className='model-name'>{props?.item?.modelName}</span>
          <span>{props?.item?.modelType}</span>
        </p>
      </div>
      <img src={props.item.imageUrl} alt={props.item.modelName} />
      <a href={`/learn/${props.item.id}`}>LEARN {'>'} </a>
      <a href={`/shop/${props.item.id}`}>SHOP {'>'} </a>
    </div>
  )
}
