"use client"

import { signOut, useSession } from 'next-auth/react';
import React from 'react'

const Chats = () => { 
    const session = useSession();

    return (
        <div>
        </div>
    )
}

export default Chats