import { Box, Button, Input } from '@mui/material';
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Drawer from '@mui/material/Drawer';
import SearchIcon from '@mui/icons-material/Search';
import { useContext } from 'react';
import { ChatContext } from '../../Context/ChatProvider';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';



function Header() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = React.useState([]);
  
  const navigate = useNavigate();

  const user = useContext(ChatContext);
  console.log("UserData:",user);

    const [state, setState] = React.useState({   
        left: false,
      });

      const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
    
        setState({ ...state, [anchor]: open });
      };
    
      
      const HandleLogout = () =>{
        localStorage.removeItem("token");
        navigate('/login');
      }
  return (
    <>
    <div>
    {[''].map((anchor) => (
        <React.Fragment key={anchor}>
        <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}  style={{ backgroundColor:"darkslateblue"}} height={'12vh'} >
            <Button variant='ghost' onClick={toggleDrawer(anchor, true)}>{anchor}
              <SearchIcon /> <Input style={{border:"none", padding:"2px", marginRight:"10px" ,color:"white"}} placeholder='search user'> </Input>
            </Button>
            <div style={{marginRight:"120px", marginLeft:"20px"}}>
            <h1 style={{fontFamily:"cursive", fontWeight:"bold" , color:"white",letterSpacing:'2px'}}>Chat App</h1>
            </div>
            <div style={{marginRight:"40px", marginTop:"10px",display:'flex',justifyContent:"space-between",width:'150px'}}>
            <Avatar>{user.user.fullname[0]}</Avatar>
            <Button style={{backgroundColor:'white',height:'35px',color:'black',fontFamily:'cursive'}} onClick={HandleLogout}>Logout</Button>

            </div>
            <Drawer style={{display:"flex" }}
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            
          <b style={{margin:"25px 50px 0px", color:"darkmagenta", fontFamily:"cursive"}}> Search User</b>
          <Box display={'flex'} paddingBottom={2}>
           <Input placeholder='Search by name' style={{margin:"20px 20px 20px"}} />
           <Button style={{ backgroundColor:"lightgray", height:"30px", margin:"18px 10px 10px -10px"}}>GO</Button>
          
           </Box>
          </Drawer>
        </Box>
        </React.Fragment>
      ))}
        <div>

          
         
        
    </div>
        

    </div>
    </>
  )
}

export default Header;