"use client"

import { signOut, useSession } from 'next-auth/react';
import React from 'react'

const Chats = () => { 
    const session = useSession();

    return (
        <div>
            <button onClick={() => signOut({callbackUrl: '/'})}>Click me</button>
        </div>
    )
}

export default Chats