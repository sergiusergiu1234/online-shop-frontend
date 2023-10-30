import { useContext, useEffect, useRef, useState } from "react";
import "../Styles/FilterBar.css";
import { AttributeValues, Type } from "../Types/Type.types";
import { Category } from "../Types/Category.types";
import { Accordion, AccordionButton, Button, Dropdown, DropdownButton, Form, FormCheck, InputGroup, Offcanvas } from "react-bootstrap";
import { Gender } from "../Types/Gender.type";
import { Brand } from "../Types/Brand.types";
import { Attribute } from "../Types/Attribute.types";
import { fetchBrands, fetchGenders, fetchTypes, getSizes } from "../api/api";
import { ToggleButton } from 'primereact/togglebutton';
import { Size } from "../Types/Size.types";
import AccordionHeader from "react-bootstrap/esm/AccordionHeader";
import AccordionItem from "react-bootstrap/esm/AccordionItem";
import AccordionBody from "react-bootstrap/esm/AccordionBody";
import FilterContext from "../context/FilterProvider";


const FilterBar = () => {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const {setFilter}= useContext(FilterContext);

  const [productName, setProductName] = useState("");

  const [genderName, setGenderName] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [typeName, setTypeName] = useState("");
  const [categoryName, setCategoryName] = useState("");

  const [selectedType, setSelectedType] = useState<Type | null>(null);
  const [types, setTypes] = useState<Type[]>([]);

  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  const [brands, setBrands] = useState<Brand[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  const [genders, setGenders] = useState<Gender[]>([]);
  const [selectedGender, setSelectedGender] = useState("");

  const [selectedValues, setSelectedValues] = useState(new Map());
  const [possibleValues, setPossibleValues] = useState<AttributeValues | null>(null);

  const [sizes, setSizes] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  let tp = sessionStorage.getItem("f");
  const handleSearch = () => {
   
      setFilter({
        productName:productName,
        brands:selectedBrands,
        gender: selectedGender,
        category_name: selectedCategory,
        minPrice:minPrice,
        maxPrice:maxPrice,
        type_name: selectedType?.name || " " ,
        attributes:mapToString(selectedValues),
        sizes:selectedSizes}
      )
 
  };
  const handleReset = () => {
    window.location.reload();
    setCategories([]);
    setTypeName("");
    setProductName("");
    setSelectedBrands([]);
    setGenderName("");
    setCategoryName("");
    setMinPrice("");
    setMaxPrice("");
   
    setSelectedCategory('');
    setSelectedType(null);
    setSelectedGender('');
    setSelectedSizes([]);
  };

  useEffect(() => {

    fetchTypes().then(data => {setTypes(data);console.log(data)});
    fetchGenders().then(data => setGenders(data));
    fetchBrands().then(data => setBrands(data));
  }, []);

  useEffect(() => {
    setSelectedCategory('');
    setSelectedValues(new Map());
    if (selectedType !== null)
      getSizes(selectedType.id).then(data => {

        setSizes(data); console.log('äicea'); console.log(data)
      })
  }, [selectedType]);

  useEffect(() => {
    const matchedType = types.find(type => type.name === tp);
    if (matchedType) {
      setSelectedType(matchedType);
      setTypeName(matchedType.name);
      setCategories(matchedType.categoryDtoList);
      setSelectedType(matchedType);
      setPossibleValues(matchedType.attributeValues);

      sessionStorage.removeItem("f")
    }
  }, [types]);

  const handleBrandChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedBrands(prevSelected => [...prevSelected, value])
    } else {
      setSelectedBrands(prevSelected => prevSelected.filter(val => val !== value))
    }
  }
  const handleSizesChange = (sizeValue: string) => {
    setSelectedSizes((prevState) => {
      if (prevState.includes(sizeValue)) {
        return prevState.filter((size) => size != sizeValue);
      } else {
        return [...prevState, sizeValue];
      }
    })
  }
  const handleAttributeCheck = (attributeName: string, attrVal: string): boolean => {

    return selectedValues.get(attributeName)?.includes(attrVal);

  };
  const handleAttributesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    const parts = value.split(",");
    const attrName = parts[0];
    const attrVal = parts[1];
    if (checked) {
      setSelectedValues(prev => {
        console.log(prev);
        const updatedValues = prev;
        if (updatedValues.has(attrName)) {
          const values = updatedValues.get(attrName);
          values.push(attrVal);
        } else {
          updatedValues.set(attrName, [attrVal])
        }

        return updatedValues;
      })
    } else {
      setSelectedValues(prev => {
        const updatedValues = prev;
        if (updatedValues.has(attrName)) {
          let values: string[] = updatedValues.get(attrName);
          updatedValues.set(attrName, values.filter(val => val !== attrVal))
        }
        return updatedValues;
      })
    }
  }

  const mapToString = (map: any) => {
    let result = '';
    //Each entry of the map...
    for (const [key, value] of map) {
      //...write it as a string
      result += `${key}:${value}_`;
    }
    //cut off the "_"
    result = result.slice(0, -1)
    return result;
  }


  useEffect(()=>{
    console.log(`selectedType ${selectedType}`);
    console.log(possibleValues);
  },[selectedType])
  return (
    <>
      <Button className=" btn notSelected" onClick={handleShow}>
        Filters
      </Button>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Filter products</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
      
        <div className="filter-container">
      <Button variant="primary" onClick={ handleSearch }>
        Search
      </Button>
      <Button variant="danger" onClick={handleReset}>
        Reset
      </Button>
      <Accordion defaultActiveKey="1" className="accordion">
        <AccordionButton className="accordion-item">
          Equipment type
        </AccordionButton>
        <AccordionBody className="filter-accordion">
          {types.map((type) => (
            <div className="button-container">

           
              <Button
                className={`btn ${selectedType === type ? "selected " : "notSelected"}`}
                key={type.id}
                onClick={() => {
                  setTypeName(type.name);
                  setCategories(type.categoryDtoList);
                  setSelectedType(type);
                  setPossibleValues(type.attributeValues);

                }}
              >
                {type.name}
              </Button>
 </div>
          

          ))}

        </AccordionBody>
      </Accordion>



      {categories.length ? (
        <Accordion defaultActiveKey="1">
          <AccordionButton className="accordion-item">
            Category
          </AccordionButton>
          <AccordionBody className="filter-accordion">
            {categories.map((category) => (
              <div className="button-container">
                <Button
                  className={`btn ${selectedCategory === category.name ? "selected " : "notSelected"}`}
                  key={category.id}
                  onClick={() => {
                    setCategoryName(category.name);
                    setSelectedCategory(category.name);
                  }}
                >
                  {category.name}
                </Button>

              </div>

            ))}

          </AccordionBody>
        </Accordion>
      ) : (
        <p>No category selected. Pick a type first.</p>
      )}


      <Accordion defaultActiveKey="1">
        <AccordionButton className="accordion-item bg-transparent">
          Product size
        </AccordionButton>
        <AccordionBody>
          {sizes.length ? (<>
            {sizes.sort((a, b) => a.localeCompare(b)).map((size) => (
              <Button
                key={size}
                className={`btn ${selectedSizes.includes(size) ? "selected" : "notSelected"}`}

                onClick={() => handleSizesChange(size)}>{size}</Button>
            ))}
          </>) : (
            <p>Pick a type first.</p>
          )}
        </AccordionBody>
      </Accordion>




      {
        possibleValues != null ?
          <>

            {/* map through a array of maps Map<string,string[]>[] */}
            {Object.entries(possibleValues).map(([attributeName, attributeValues]) => (
              <div key={attributeName}>
                <Accordion>

                  <AccordionButton className="accordion-item bg-transparent">
                    {attributeName}
                  </AccordionButton>
                  <Accordion.Body className="filter-accordion">
                    <div className="buttons">
                      {attributeValues && attributeValues
                        .sort((a, b) => {
                          if (!isNaN(Number(a)) && !isNaN(Number(b))) {
                            return Number(a) - Number(b);
                          }
                          return a.localeCompare(b);
                        })
                        .map((value) => (
                          <Form.Check
                            key={value}
                            onChange={handleAttributesChange}
                            label={value}
                            value={[attributeName, value]}
                            checked={handleAttributeCheck(attributeName, value)}
                          />
                        ))}
                    </div>
                  </Accordion.Body>
                </Accordion>


              </div>
            ))
            }
          </>
          :
          <></>
      }


      <h3 className="fbh3">Brand</h3>
      {brands.map((brand) => (
        <Form.Check
          key={brand.id}
          onChange={handleBrandChange}
          label={brand.name}
          value={brand.name}
          checked={selectedBrands.includes(brand.name)}
        />
      ))}
      <br />

      <h4>Gender</h4>
      <DropdownButton
        id="dropdown-item-button"
        title={selectedGender ? selectedGender : "Select gender"}
        variant="bg transaprent"
       
      >
        <Dropdown.ItemText>Pick gender</Dropdown.ItemText>
        {genders.map((gender) => (
          <Dropdown.Item
            as="button"
            key={gender.id}
            onClick={() => {
              setGenderName(gender.name);
              setSelectedGender(gender.name);

            }}
          >
            {gender.name}
          </Dropdown.Item>
        ))}
      </DropdownButton>

      <h3 className="fbh3">Name</h3>
      <input
        id="productName"
        type="text"
        onChange={(e) => setProductName(e.currentTarget.value)}
        value={productName}
      />

      <h3 className="fbh3">Minimum price</h3>
      <input
        id="minPrice"
        type="number"
        pattern="[0-9]*"
        onChange={(e) => setMinPrice(e.currentTarget.value)}
        value={minPrice}
      />
      <h4>Maximum price</h4>
      <input
        id="maxPrice"
        type="number"
        pattern="[0-9]*"
        onChange={(e) => setMaxPrice(e.currentTarget.value)}
        value={maxPrice}
      />
    </div>

        </Offcanvas.Body>
      </Offcanvas>
    </>



    
  );
};

export default FilterBar;
