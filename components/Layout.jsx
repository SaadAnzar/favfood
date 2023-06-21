import React from 'react'
import { motion } from 'framer-motion'

const variants = {
  hidden: { opacity: 0, x: 0, y: 40 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: -100 },
}

const Layout = ({ children }) => {
  return (
    <motion.main
      variants={variants}
      initial="hidden"
      animate="enter"
      exit="exit"
      transition="linear"
    >
      {children}
    </motion.main>
  )
}

export default Layout
