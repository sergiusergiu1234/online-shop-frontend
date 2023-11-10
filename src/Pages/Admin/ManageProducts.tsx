import { useEffect, useState } from "react";
import { Button, Dropdown, DropdownButton, FloatingLabel, Form, InputGroup } from "react-bootstrap";
import { Brand } from "../../Types/Brand.types";
import { Gender } from "../../Types/Gender.type";
import { Type } from "../../Types/Type.types";
import { Category } from "../../Types/Category.types";
import { API_URL, createProduct, fetchBrands, fetchGenders, fetchTypes, uploadProductAttribute, uploadProductImage, uploadProductSize } from "../../api/api";
import { create } from "domain";
import { useNotifications } from "../../context/NotificationContext";
import { Attribute } from "../../Types/Attribute.types";
import '../../Styles/ManageProducts.css';
import { Size } from "../../Types/Size.types";
const ManageProducts = () => {
  const [attributeValues, setAttributeValues] = useState<Map<number, string>>(new Map());
  const { addNotification } = useNotifications();
  const [productId, setProductId] = useState<number>(0)
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [brands, setBrands] = useState<Brand[]>([]);
  const [types, setTypes] = useState<Type[]>([])
  const [genders, setGenders] = useState<Gender[]>([]);
  const [attributes, setAttributes] = useState<Attribute[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [stock, setStock] = useState<number>(0);

  const [selectedCategory, setSelectedCategory] = useState<Category>();
  const [selectedBrand, setSelectedBrand] = useState<Brand>();
  const [selectedType, setSelectedType] = useState<Type>();
  const [selectedGender, setSelectedGender] = useState<Gender>();
  const [selectedFile, setSelectedFile] = useState<File | null>();
  const [selectedSize, setSelectedSize] = useState<Size>();
  //control file upload component
  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    console.log(file);
    if (file && file.size <= 1000000) {
      setSelectedFile(file);
    } else {
      setSelectedFile(null);
      console.log("File too big");
    }
  };

  useEffect(() => {
    fetchTypes().then(data => setTypes(data));
    fetchBrands().then(data => setBrands(data));
    fetchGenders().then(data => setGenders(data));

  }, [])
  useEffect(() => {
    setCategories(selectedType ? selectedType.categoryDtoList : []);
    setAttributes(selectedType ? selectedType.attributeDtoList : []);
    console.log(selectedType)
  }, [selectedType])



  const handleUploadImage = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (selectedFile && productId !== 0) {
      const response = await uploadProductImage(selectedFile, productId);
      if (response.ok) {
        addNotification(await response.text(), 'success', 'Success');
      } else {
        addNotification(await response.text(), 'danger', 'Something happened while uploading image.')
      }
    }
  }

  const handleSubmitProduct = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createProduct(productName,
      selectedBrand ? selectedBrand.name : "",
      selectedGender ? selectedGender.name : "",
      selectedCategory ? selectedCategory.name : "",
      price,
      description
    ).then(data => setProductId(data.id));
  }

  const handleAttributeChange = (id: number, value: string) => {
    setAttributeValues((prevValues) => {
      const newValues = new Map(prevValues);
      newValues.set(id, value);
      return newValues;
    })
  }

  const handleAttributeAdd = async (attribute: Attribute, productId: number, value: string) => {
    const response = await uploadProductAttribute(attribute.id, productId, value);
    if (response) {
      if (response.ok) {
        addNotification(`Attribute ${attribute.name}=${value} was added to product ${productId} succesfully`, 'success', 'Success!');
      } else {
        addNotification(await response.text(), 'danger', 'Something happened.');
      }
    }
  }

  const handleAddProductSize = async () =>{
    if(selectedSize && productId !== 0 && stock !== 0){
      const response= await uploadProductSize(selectedSize.id,productId,stock);
      if(response.ok){
        addNotification(`Size ${selectedSize.value} with id ${selectedSize.id}, stock: ${stock} for product ${productId} was added
        succesfully to the database.`,'success',"Success!");
      }else{
        addNotification(await response.text(),'danger',"Post failed.");
      }
    }
  }
  return (<div>
    <section>
      <h6>Add new product </h6>
      <form onSubmit={handleSubmitProduct}>
        <FloatingLabel label="Product name" className="floating">
          <Form.Control
            placeholder="Product name"
            type="text"
            onChange={(e) => setProductName(e.target.value)}
            value={productName}
            required
          />
        </FloatingLabel>
        <FloatingLabel label="Price">
          <Form.Control
            placeholder="Price"
            id="price"
            type="number"
            pattern="[0-9]*"
            onChange={(e) => setPrice(e.currentTarget.value)}
            value={price}
          />
        </FloatingLabel>
        <FloatingLabel controlId="textarea" label="Product description">
          <Form.Control
            as="textarea"
            placeholder="Enter product description"
            style={{ height: "100px" }}
            onChange={(e) => setDescription(e.currentTarget.value)}
            value={description}
          />
        </FloatingLabel>
        <DropdownButton
          id="dropdown-item-button"
          title={selectedType?.name ? selectedType.name : "Select type"}
        >
          <Dropdown.ItemText>Select type</Dropdown.ItemText>
          {types.map((type) => (
            <Dropdown.Item
              as="button"
              key={type.id}
              onClick={(event) => {
                event.preventDefault();
                setSelectedType(type);
                setCategories(type.categoryDtoList);

              }}
            >
              {type.name}
            </Dropdown.Item>
          ))}
        </DropdownButton>

        <DropdownButton
          id="dropdown-item-button"
          title={selectedCategory ? selectedCategory.name : "Select category"}
        >
          <Dropdown.ItemText>Select category</Dropdown.ItemText>

          {categories.map((category: Category) => (
            <Dropdown.Item
              as="button"
              key={category.id}
              onClick={(event) => {
                event.preventDefault();
                setSelectedCategory(category);
              }}
              value={category.name}
            >
              {category.name}
            </Dropdown.Item>
          ))}
        </DropdownButton>

        <DropdownButton
          id="dropdown-item-button"
          title={selectedBrand?.name ? selectedBrand.name : "Select brand"}
        >
          <Dropdown.ItemText>Select brand</Dropdown.ItemText>
          {brands.map((brand: Brand) => (
            <Dropdown.Item
              as="button"
              key={brand.id}
              onClick={(event) => {
                event.preventDefault();
                setSelectedBrand(brand);
              }}
              value={brand.name}
            >
              {brand.name}
            </Dropdown.Item>
          ))}
        </DropdownButton>
        <DropdownButton
          id="dropdown-item-button"
          title={selectedGender ? selectedGender.name : "Select gender"}
        >
          <Dropdown.ItemText>Select gender</Dropdown.ItemText>
          {genders.map((gender: Gender) => (
            <Dropdown.Item
              as="button"
              key={gender.id}
              onClick={(event) => {
                event.preventDefault();
                setSelectedGender(gender);
              }}
              value={gender.name}
            >
              {gender.name}
            </Dropdown.Item>
          ))}
        </DropdownButton>
        <Button variant="success" type="submit">
          Create product
        </Button>
      </form>
      <hr />
      <h6>Upload product image</h6>
      <Form onSubmit={handleUploadImage}>
        <InputGroup>
          <FloatingLabel label="Product id ">
            <Form.Control
              placeholder="Product id"
              id="id"
              type="number"
              pattern="[0-9]*"
              onChange={(e) => setProductId(parseInt(e.currentTarget.value))}
              value={productId !== null ? productId.toString() : ""}
            />
          </FloatingLabel>
          <Button variant="success" type="submit">
            Upload Image
          </Button>
        </InputGroup>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Control
            required={true}
            type="file"
            onChange={handleFileChange}
          />

        </Form.Group>

      </Form>

      <h6>Add product attributes</h6>
      {attributes.map((attribute: Attribute) => (
        <div className="col-sm-6">
          <InputGroup className="mb-3">
            <Button
              variant="outline-secondary"
              onClick={() => handleAttributeAdd(attribute, productId, attributeValues.get(attribute.id) || "")}
              className="btn-sm fixed-width-button "
            >
              Add {attribute.name}
            </Button>
            <Form.Control
              placeholder={attribute.name}
              type="text"
              onChange={(e) => handleAttributeChange(attribute.id, e.target.value)}
              value={attributeValues.get(attribute.id)}
              className="border-secondary text-dark"
            />
          </InputGroup>
        </div>
      ))}

      <h6>Add product size</h6>
      <div className="add-sizes-container">


        <InputGroup>
          <DropdownButton
            id="dropdown-item-button"
            title={selectedSize ? selectedSize.value : "Select size"}
          >
            <Dropdown.ItemText>Select Size</Dropdown.ItemText>
            {selectedType?.sizeList.map((size) => (
              <Dropdown.Item
                as="button"
                key={size.id}
                onClick={(event) => {
                  event.preventDefault();
                  setSelectedSize(size);
                }}
                value={size.value}
              >
                {size.value}
              </Dropdown.Item>
            ))}
          </DropdownButton>
          <FloatingLabel label="Product id ">
            <Form.Control
              placeholder="Product id"
              id="id"
              type="number"
              pattern="[0-9]*"
              onChange={(e) => setProductId(parseInt(e.currentTarget.value))}
              value={productId !== null ? productId.toString() : ""}
            />
          </FloatingLabel>
          <FloatingLabel label="Stock">
            <Form.Control
              placeholder="stock"
              id="id"
              type="number"
              pattern="[0-9]*"
              onChange={(e) => setStock(parseInt(e.currentTarget.value))}
              value={stock}
            />
          </FloatingLabel>

          <Button onClick={handleAddProductSize} className="fixed-width-button" variant="success">
            Add size
          </Button>
        </InputGroup>

      </div>
    </section>
  </div>)
}
export default ManageProducts;