"use client"
import {useEffect, useState} from 'react';
import { Card, Flex, Text, Badge, Button,  Avatar, Title, Center } from '@mantine/core';
import { IconPhoneCall, IconGlobe, IconUserPlus, IconTrash, IconStar} from '@tabler/icons-react';
import axios from 'axios';
import '../styles/page.css'

interface CardVisibility {
  [key: string]: boolean;
}

interface Follow {
  [key: string]: boolean;
}

 interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
}

export default function HomePage() {
const [users, setUsers]=useState<User[] | undefined>(undefined)
const [cardsVisibility, setCardsVisibility] = useState<CardVisibility>({
  0: true,
  1: true,
  2: true,
  3: true,
  4: true,
  5: true,
  6: true,
  7: true,
  8: true,
  9:true
});
const [followFunctionality, setFollowFunctionality]=useState<Follow>({
  0: false,
  1: false,
  2: false,
  3: false,
  4: false,
  5: false,
  6: false,
  7: false,
  8: false,
  9: false
})
useEffect(()=>{
   axios.get<User[]>('https://jsonplaceholder.typicode.com/users')
   .then((res)=>setUsers(res.data))
},[])
 const fnFollow=(ind:number)=>{
    setFollowFunctionality((prevFollow) => ({
      ...prevFollow,
      [ind]: !prevFollow[ind],
    }));
 }
 const fnDeleteCard=async (ind:number)=>{
  setCardsVisibility((prevVisibility) => ({
    ...prevVisibility,
    [ind]: !prevVisibility[ind],
  }));

 }
  
  return <div className='container'>
    
    {users && users.map((val:User,ind: number)=>{
    return <div className='card' key={ind}>
    { cardsVisibility[ind] &&
      <Card shadow="xl" padding="lg" radius="md" withBorder>
        <Card.Section className='image'>
          <Avatar
           size="lg"
           radius="xl"
           src={`https://api.dicebear.com/7.x/initials/svg?seed=${val.name}`}
           />
        </Card.Section>

      <Text fw={500} style={{marginLeft:130}}>{followFunctionality[ind] ? `${val.name} ${'*'}` : val.name}</Text>

    <ul style={{listStyle:'none'}}>
      <li>@  <Text size="sm" style={{display:"inline"}}>{val.email}</Text></li>
      <li><IconPhoneCall size="1.05rem"  stroke={1.5} />
      <Text size="sm" style={{display:"inline"}}>{val.phone}</Text>
      </li>
      <li>
      <IconGlobe size='1.05rem' stroke={1.5}/>
      <Text size='sm' style={{display:"inline"}} >{val.website}</Text>
      </li>
    </ul>

    <Flex gap={'md'}>
      <Button leftSection={<IconUserPlus size={14}/>} onClick={()=>fnFollow(ind)} variant={followFunctionality[ind] ? 'light' : 'blue'} fullWidth mt="md" radius="md">
        {followFunctionality[ind] ? 'Unfollow' :'Follow'}
      </Button>
      <Button leftSection={<IconTrash size={14}/>} variant='light' fullWidth mt='md' radius='md' onClick={()=>fnDeleteCard(ind)}>Delete</Button>
    </Flex>
      </Card>
    }
      </div>
  })}
  </div>;

  
}
