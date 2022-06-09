import axios from 'axios'
import React, {useEffect, useState} from 'react'
import './conversations.css'

function Conversations(props) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState(null)

  useEffect(()=>{
    const friendId = props.members.find(member=> member !== props.currenUser?._id)

    const getUser = async ()=>{
      try {
        const res = await axios(`/users?userId=${friendId}`)
        setUser(res.data)
      } catch (error) {
        console.log('error: ', error);
      }
    }
    getUser()
  }, [props.currentUser, props.members])

  return (
    <div className='conversations'>
        <img src={`${PF}${user?.profilePicture ? user?.profilePicture : "/person/no-avatar.png"}`} className='conversations__img' alt="" />
        <span className="conversations__name">{user?.username}</span>
    </div>
  )
}

export default Conversations