'use client'

import NavBar from '@/components/Navigation'
import '../public/static/css/globals.css'
import '../public/static/css/stars.sass'
import { useState } from 'react'

export default function RootLayout({ children, }: { children: React.ReactNode }) {
	const [loggedin, setLogin] = useState(false);
	return (
		<html lang="en">
			<body className="flex flex-col h-screen w-screen text-white font-Inter">
				<NavBar loggedin={ loggedin }/>
				<div id="stars" className='-z-30'></div>
				<div id="stars2" className='-z-40'></div>
				<div id="stars3" className='-z-50'></div>
				<div className='flex justify-center w-screen'>{ children }</div>
				<div className='z-40 fixed bottom-5 end-5 text-slate-500'>made by titans@titancrew 👀</div>
			</body>
		</html>
	)
}
