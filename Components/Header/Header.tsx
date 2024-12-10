import React from 'react'
import styles from './Header.module.css'
import Link from 'next/link'

export default function Header() {
  return (
    <header className={styles.header}>
        <h1>React & Next.js</h1>
        <nav className={styles.nav}>
        <ul >
          <li className='transition-transform duration-200 hover:scale-105'><Link href="/">Home →</Link></li>
          <li className='transition-transform duration-200 hover:scale-105'><Link href="/produtos">Produtos →</Link></li>
          <li className='transition-transform duration-200 hover:scale-105'><Link href="/tecnologias">Tecnologias →</Link></li>
        </ul>
        </nav>
    </header>
  )
}
