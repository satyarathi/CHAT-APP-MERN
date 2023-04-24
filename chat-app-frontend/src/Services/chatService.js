import axios from 'axios';
const url = 'http://localhost:6060/api/v1/';

const headerConfig = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

export const fetchChats = async () =>{
    const data = await axios.get(url + "chat/", headerConfig)
    console.log(data);
    console.log('token;', headerConfig );
    return data;
    
}