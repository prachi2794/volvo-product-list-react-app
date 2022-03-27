import React from "react";
import { Item } from "../ProductCard/models";

export function Pagination(props: { data: any, paginationValue: string, setPaginationValue: (arg0: string) => void,}) {
    const handler = (e: any) => {
        props.setPaginationValue(e.target.value)
    }
    return (
        <form className="pagination" onChange={(e)=> {handler(e)}}>
            {props?.data.map((item: Item,index: number) => {
                return <input key={index} type="radio" name="select" value={item.id} id={item.id}/>
            })}
        </form>
    )
}
