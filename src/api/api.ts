 //export const API_URL = 'http://localhost:8080';
export const API_URL='https://slope-emporium-app-b7686b574df7.herokuapp.com'


export const fetchTypes = async () => {
    const url = `${API_URL}/types/all`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  };
  export const fetchType = async(categoryName:string)=>{
    const url = `${API_URL}/types/admin/get/c=${categoryName}`
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }
  export const fetchGenders = async () => {
    const url =`${API_URL}/genders/all`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  };
  
  export const fetchBrands = async () => {
    const url =`${API_URL}/brands/all`;
    const response = await fetch(url,{
      method: 'GET'
    });
    const data = await response.json();
    return data;
  };
  
  export const fetchCategories = async () =>{
    const url = `${API_URL}/categories/all`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }


  export const handleCheckout = async (checkoutData:any) =>{
    const url =`${API_URL}/order/create`;
    const token = sessionStorage.getItem(`accessToken`);
    const response = await fetch(url,{
      method: 'POST',
      headers:{
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(checkoutData)
    });
    
    return response;
  }
  
export const getSizes = async (type_id:number) =>{
  const url = `${API_URL}/products/sizes/${type_id}`;
  const response = await fetch(url,{
    method: 'GET'
  });

  return response.json();
}
 

export const fetchOrders =async () => {
  const url = `${API_URL}/order`;
  const token = sessionStorage.getItem(`accessToken`);
  const response = await fetch(url,{
    method: 'GET',
    headers:{
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
  });
  const data = await response.json();
  return data;
}

export const fetchAllOrders = async ()=>{
  const url = `${API_URL}/order/admin/all`;
  const token = sessionStorage.getItem(`accessToken`);;
  const response = await fetch(url,{
    method:'GET',
    headers:{
      'Authorization': `Bearer ${token}`,
    }
  });
  const data = await response.json();
  return data;
}

export const updatePersonalData = async(selected:string, text:string)=>{
  const url = `${API_URL}/users/me/edit/${selected}`;
  const token = sessionStorage.getItem(`accessToken`);;
  const requestBody = {
    'updateText': text
  }
  console.log(url)
  const response = await fetch(url, {
    method: 'PUT',
    headers:{
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody)
  });
  const data = await response;
  return data;
}

export const updateOrderStatus = async(orderId:number | null , newStatus:string) =>{
  const url = `${API_URL}/order/update`;
  const token = sessionStorage.getItem(`accessToken`);;
  const requestBody = {
    'orderId': orderId,
    'newStatus': newStatus
  }
  const response = await fetch (url,{
    method:'PUT',
    headers:{
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody)
  });
  const data = await response.json();
  return data;
}

export const deleteProduct = async (productId:number | null) => {
  const url = `${API_URL}/products/admin/${productId}`;
  const token = sessionStorage.getItem(`accessToken`);;
  const response = await fetch(url,{
    method: 'DELETE',
    headers:{
      'Authorization': `Bearer ${token}`,
    }
  });
  return response;
}


export const addBrand = async (brandName: string) => {
const url = `${API_URL}/brands/admin/add`;
const token = sessionStorage.getItem(`accessToken`);;
const requestBody = {
  'name': brandName
}
const response = await fetch(url,{
  method: 'POST',
  headers:{
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(requestBody)
});
const data = await response.json();
return data;
}

export const deleteBrand = async (brandId:number)=>{
  const url =`${API_URL}/brands/admin/delete/${brandId}`;
  const token = sessionStorage.getItem(`accessToken`);;
  const response = await fetch (url,{
    method:'DELETE',
    headers:{
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  const data = await response.json();
  return data;
}
export const editBrand = async (brandId:number | null, brandName:string) => {
  const url = `${API_URL}/brands/admin/edit/${brandId}`;
  const token = sessionStorage.getItem(`accessToken`);;
  const requestBody = JSON.stringify({ name: brandName }); 
  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: requestBody
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};


export const addCategory = async (categoryName: string,typeId:number | null ) => {
  const url = `${API_URL}/categories/admin/add`;
  const token = sessionStorage.getItem(`accessToken`);;
  const requestBody = {
    'name': categoryName,
    'typeId': typeId
  }
  const response = await fetch(url,{
    method: 'POST',
    headers:{
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody)
  });
  const data = await response.json();
  return data;
  }

export const deleteCategory = async (categoryId:number)=>{
  const url =`${API_URL}/categories/admin/delete/${categoryId}`;
  const token = sessionStorage.getItem(`accessToken`);;
  const response = await fetch (url,{
    method:'DELETE',
    headers:{
      'Authorization': `Bearer ${token}`
    }
  });
  const data = await response.json();
  return data;
}

export const editCategory = async (categoryId:number | null , categoryName:string)=>{
const url = `${API_URL}/categories/admin/edit/${categoryId}`;
const token = sessionStorage.getItem(`accessToken`);;
const requestBody = JSON.stringify({ name: categoryName }); 
const response = await fetch (url,{
  method:'PUT',
  headers:{
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: requestBody
});
const data = await response.json();
return data;
}

export const deleteType = async (typeId:number)=>{
  const url = `${API_URL}/types/admin/delete/${typeId}`;
  const token = sessionStorage.getItem(`accessToken`);;
  const response = await fetch (url,{
    method:'DELETE',
    headers:{
      'Authorization': `Bearer ${token}`
    }
  });
  const data = await response.json();
  return data;
}

export const addType = async (typeName: string) => {
  const url = `${API_URL}/types/admin/add`;
  const token = sessionStorage.getItem(`accessToken`);;
  const requestBody = {
    'name': typeName
  }
  const response = await fetch(url,{
    method: 'POST',
    headers:{
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody)
  });
  const data = await response.json();
  return data;
  }

export const editType = async (typeName:string,typeId:number | null) =>{
  const url =`${API_URL}/types/admin/edit/${typeId}`;
  const token = sessionStorage.getItem(`accessToken`);;
    const requestBody = JSON.stringify({ name: typeName }); 
    const response = await fetch (url,{
      method:'PUT',
      headers:{
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: requestBody
    });
    const data = await response.json();
    return data;
    }

  export const addSize = async (sizeValue:string, typeId:number | null) =>{
    const url=`${API_URL}/size/admin/add`;
    const token = sessionStorage.getItem(`accessToken`);;
    const requestBody = {
      'value': sizeValue,
      'typeId': typeId
    }
    const response = await fetch(url,{
      method: 'POST',
      headers:{
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });
    const data = await response.json();
    return data;
  }
  export const deleteSize = async (sizeId:number |null) =>{
    const url =`${API_URL}/size/admin/delete/${sizeId}`;
    const token = sessionStorage.getItem(`accessToken`);;
    const response = await fetch(url, {
      method: `DELETE`,
      headers:{
        'Authorization': `Bearer ${token}`
      }
    });
    const data = await response.json();
    return data;
  }
  export const addAttribute = async (attributeName:string , typeId:number | null)=>{
    const url = `${API_URL}/attributes/admin/add`;
    const token = sessionStorage.getItem(`accessToken`);;
    const requestBody = {
      'name': attributeName,
      'typeId': typeId
    }
    const response = await fetch(url,{
      method: 'POST',
      headers:{
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });
    const data = await response.json();
    return data;
    }

    export const editAttribute = async (attributeName: string, attributeId: number | null) =>{
      const url = `${API_URL}/attributes/admin/edit/${attributeId}`;
    const token = sessionStorage.getItem(`accessToken`);;
    const requestBody = JSON.stringify({ name: attributeName }); 
    const response = await fetch (url,{
      method:'PUT',
      headers:{
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: requestBody
    });
    const data = await response.json();
    return data;
    }

    export const deleteAttribute = async (attributeId: number | null) => {
   const url = `${API_URL}/attributes/admin/delete/${attributeId}`;
  const token = sessionStorage.getItem(`accessToken`);;
  const response = await fetch (url,{
    method:'DELETE',
    headers:{
      'Authorization': `Bearer ${token}`
    }
  });
  const data = await response.json();
  return data;
}
   

export const addGender = async (genderName:string) => {
  const url = `${API_URL}/genders/admin/add`;
  const token = sessionStorage.getItem(`accessToken`);;
  const requestBody = {
    'name': genderName
  }
  const response = await fetch(url,{
    method: 'POST',
    headers:{
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody)
  });
  const data = await response.json();
  return data;
  }

  export const deleteGender = async (genderId:number)=>{
    const url = `${API_URL}/genders/admin/${genderId}`;
    const token = sessionStorage.getItem(`accessToken`);;
    const response = await fetch (url,{
      method:'DELETE',
      headers:{
        'Authorization': `Bearer ${token}`
      }
    });
    const data = await response.json();
    return data;
  }

  export const editGender = async (genderName: string, genderId: number) =>{
    const url = `${API_URL}/genders/admin/edit/${genderId}`;
  const token = sessionStorage.getItem(`accessToken`);;
  const requestBody = JSON.stringify({ name: genderName }); 
  const response = await fetch (url,{
    method:'PUT',
    headers:{
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: requestBody
  });
  const data = await response.json();
  return data;
  }

 