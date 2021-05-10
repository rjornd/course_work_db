import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CabinetItem from "./cabinetItem";

const CabinetList = () => {
    const dispatch = useDispatch()
    const cabinets = useSelector(state => state.employees.availableCabs)
    
    return ( 
        <tbody>
            {cabinets.map(
                cabinet =>
                <CabinetItem key = {cabinet.id} cabinet = {cabinet}/>
            )}
        </tbody>
    );
};
export default CabinetList;