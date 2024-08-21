import { useEffect, useState } from 'react'
import './App.css'
import SendIcon from '@mui/icons-material/Send';
import { getDatabase, ref, push, set, onChildAdded } from "firebase/database";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import Chats from './components/Chats';
function App() {
  const [user, setUser] = useState('')
  const [msg, setMsg] = useState('')
  const [chats, setChats] = useState([])
  const db = getDatabase();
  const chatListRef = ref(db, 'chats');
  const sendMessage = () => {
    const checkMsg = msg.trim()
    if (checkMsg.length > 0) {
      const chatRef = push(chatListRef);
      set(chatRef, {
        user,
        message: msg
      });
      setMsg('')
    }
  }
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const login = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        setUser({ name: user.displayName, email: user.email })
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  }

  const updateHeight = () => {
    const element = document.getElementById('chat')
    if (element) element.scrollTop = element.scrollHeight
  }

  useEffect(() => {
    onChildAdded(chatListRef, (data) => {
      setChats((prev) => [...prev, data.val()])
      setTimeout(() => {
        updateHeight()
      }, 700);
    });
  }, [])
  const handleKey = (e) => {
    if (e.key === 'Enter') sendMessage()
  }
  return (
    <>
      <div className='bg-slate-900 min-h-[100vh] pt-1 '>
        {user ?
          <div className=''>
            <div className=''>
              <h1 className='text-slate-300 text-2xl p-1 font-bold'> {user?.name}</h1>
            </div>
            <Chats chats={chats} user={user} />
            <div className='bg-slate-700 fixed w-full z-10 bottom-0 rounded-md flex items-center px-5 min-h-[50px]'>
              <input type="text" placeholder='Message' value={msg} onChange={(e) => setMsg(e.target.value)}
                onKeyDown={handleKey}
                className='bg-transparent w-full outline-none text-white p-2 ' />
              <SendIcon className='text-green-500' sx={{ fontSize: 27 }} onClick={sendMessage}
              />
            </div>
          </div>
          : <div className='flex justify-center items-center h-[100vh]'>
            <button className='text-white borde bg-gradient-to-r from-gray-600 to-slate-700 hover:from-gray-700 hover:to-gray-600 py-3 px-6 rounded-md'
              onClick={(e) => login()} >
              signIn
            </button>
          </div>}
      </div>
    </>
  )
}

export default App