interface CaruselItemProps{
    source: string
}


const CaruselItem = ({source}:CaruselItemProps)=>{
    return (<div>
        <img src={source}/>
    </div>)
}
export default CaruselItem;