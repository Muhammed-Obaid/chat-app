import React from 'react'

const Chats = ({ chats, user }) => {
    return (
        <>
            <div id='chat' className='chat-container flex flex-col gap-[7px] mt-3 h-[82vh] overflow-y-auto'>
                {chats?.map((chat, i) => (
                    <div key={i} className={`main ${chat?.user?.email === user?.email ? 'me' : ''}`}>
                        {/* <img src={user?.profile} className=' h-[27px] w-[27px] rounded-full mx-1' alt="img" /> */}
                        <p className={`border-tr bg-gren-300 rounded-[10px] px-2 py-1 `}>
                            <strong className='font-bold text-md block'>{chat.user?.name}</strong>
                            <span>{chat.message}</span>
                        </p>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Chats
