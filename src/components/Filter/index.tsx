import React from "react";
import "./styles.css"

export function Filter(props: { values: any, selectedValue: string, setSelectedValue: (arg0: string) => void, }) {

    const arr = props.values;
    const handler = (e: any) => {
        props.setSelectedValue(e.target.value)
    }
    return (
        <div className="filter">
            <select value={props.selectedValue} onChange={(e) => handler(e)}>
                {props.values && props.values.map((value: string, index: number) => {
                    return <option key={index} value={value}>{value}</option>
                })}
            </select>
        </div>
    )
}
