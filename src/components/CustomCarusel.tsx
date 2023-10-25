import { Card } from "react-bootstrap";
import "../Styles/CustomCarusel.css";
import { useEffect, useState } from "react";

const items = [
    { id: 1, imgSrc: './snwb1.jpg' },
    { id: 2, imgSrc: './burton1.jpg' },
    { id: 3, imgSrc: './burton2.jpg' },
    { id: 4, imgSrc: './fav.jpg' },
    { id: 5, imgSrc: './back.jpg' },
    { id: 6, imgSrc: './bricks.png' }


  ];
  const CustomCarousel = () => {
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(2); // Initially display 3 items
    const [visibleItems,setVisibleItems] = useState(items.slice(start,end+1));
    
    const handleNext = () => {
        let newStart = (start + 1) % items.length;
        let newEnd = (end + 1) % items.length;
       
       
        if (newStart > newEnd) {
          
          const visibleItems = items.slice(newStart).concat(items.slice(0, newEnd + 1));
          setStart(newStart);
          setEnd(newEnd);
          setVisibleItems(visibleItems);
        } else {
          const visibleItems = items.slice(newStart, newEnd + 1);
          setStart(newStart);
          setEnd(newEnd);
          setVisibleItems(visibleItems);
        }
      };
    


      const handlePrev = () => {
        let newStart = (start - 1 + items.length) % items.length;
        let newEnd = (end - 1 + items.length) % items.length;
        
        
        if (newEnd < newStart) {
          
          const visibleItems = items.slice(newStart).concat(items.slice(0, newEnd + 1));
          setStart(newStart);
          setEnd(newEnd);
          setVisibleItems(visibleItems);
        } else {
          const visibleItems = items.slice(newStart, newEnd + 1);
          setStart(newStart);
          setEnd(newEnd);
          setVisibleItems(visibleItems);
        }

      };
    

      return (
        <div className="carusel-container">
          <button onClick={handlePrev}>
            Prev
          </button>
          <div className="carusel-items-container">
            {visibleItems.map((item) => (
              <div
                key={item.id}
                className={`carusel-item`}
              >
                <img className={'image'} src={item.imgSrc} alt={`Item ${item.id}`} />
              </div>
            ))}
          </div>
          <button onClick={handleNext}>
            Next
          </button>
        </div>
      );
    };
  
  export default CustomCarousel;