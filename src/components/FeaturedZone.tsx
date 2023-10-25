
import "../Styles/FeauredZone.css";
import { Card, Carousel, Stack } from "react-bootstrap";
import { useEffect, useState } from "react";
import {FaChevronCircleLeft,FaChevronCircleRight} from 'react-icons/fa';
import { IconContext } from "react-icons";
const items = [
    { id: 1, imgSrc: './snwb1.jpg' },
    { id: 2, imgSrc: './burton1.jpg' },
    { id: 3, imgSrc: './burton2.jpg' },
    { id: 4, imgSrc: './snwb1.jpg' },
    { id: 5, imgSrc: './snwb1.jpg' },
    { id: 6, imgSrc: './snwb1.jpg' },
    { id: 7, imgSrc: './burtonmen1.jpg' },
    { id: 8, imgSrc: './snwb1.jpg' },
    { id: 9, imgSrc: './burton1.jpg' },
    { id: 10, imgSrc: './burton2.jpg' },
    { id: 11, imgSrc: './snwb1.jpg' },
    { id: 12, imgSrc: './snwb1.jpg' },
    { id: 13, imgSrc: './snwb1.jpg' },
    { id: 14, imgSrc: './burtonmen1.jpg' },{ id: 1, imgSrc: './snwb1.jpg' },
    { id: 15, imgSrc: './burton1.jpg' },
    { id: 16, imgSrc: './burton2.jpg' },
    { id: 17, imgSrc: './snwb1.jpg' },
    { id: 18, imgSrc: './snwb1.jpg' },
    { id: 19, imgSrc: './snwb1.jpg' }


    // Add more items as needed
  ];
  

  
  const FeaturedZone = () => {
    const [index, setIndex] = useState(0);
    const [mobile, setMobile] = useState(false);
    const [offset,setOffset] = useState(1);
    const handleSelect = (selectedIndex:number) => {
      setIndex(selectedIndex);
    };
    
    useEffect(() => {
      window.addEventListener('resize', handleResize);
      handleResize();
    }, []);

    const handleResize = () => {
      if(window.innerWidth <= 620){
        setOffset(1);}

        else if(window.innerWidth <=790){
          setOffset(2);
        
      }else if( window.innerWidth <= 990 ){
        setOffset(3);
      }
       else if (window.innerWidth <=1300) {
        setMobile(true);
        setOffset(4);
      }  else {
        setMobile(false);
        setOffset(5);
      }
    }
   

  
    return (<>
  
      <Carousel 
        className='carusel' 
        indicators={false} 
        interval={5000} 
        variant="dark" 
        activeIndex={index} 
        onSelect={handleSelect}
        nextIcon={<FaChevronCircleRight className="control-icon r"/>}
        prevIcon={<FaChevronCircleLeft className="control-icon l"/>}>
      {items.map((item, i) => (
        i % offset === 0 && (
          <Carousel.Item key={i} className="carousel-body">
            <Stack
              direction="horizontal"
            >
              {items.slice(i, i + offset).map((item) => (
                <Card key={item.id}>
                  <Card.Body>
                    <img className="featured-image" src={item.imgSrc} alt={`Item ${item.id}`} />
                  </Card.Body>
                </Card>
              ))}
            </Stack>
          </Carousel.Item>
        )
      ))}
    </Carousel>
    
    </>
    );
  };
  
export default FeaturedZone;
  


  
  