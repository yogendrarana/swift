import type { Metadata } from 'next'


// import css
import '@/styles/globals.css'


// import components
import { Toaster } from 'react-hot-toast'
import AuthContext from '@/context/authContext'


// import components
import ActiveStatus from '@/components/active_status/ActiveStatus'


export const metadata: Metadata = {
    title: 'Swift Chat',
    description: 'Chat application.',
}


export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <script type="module" defer src="https://cdn.jsdelivr.net/npm/ldrs/dist/auto/dotWave.js"></script>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" />
            </head>
            <body>
                <AuthContext>
                    <Toaster toastOptions={{
                        className: '',
                        style: { padding: '1rem', fontSize: '1.25rem', borderRadius: '0.5rem', },
                    }} />
                    <ActiveStatus />
                    <main>
                        {children}
                    </main>
                </AuthContext>
            </body>
        </html>
    )
}
