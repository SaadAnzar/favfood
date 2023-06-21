import Link from 'next/link'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import { UserAuth } from '@/context/AuthContext'

const Navbar = () => {
  const { user, googleSignIn, googleSignOut } = UserAuth()

  const router = useRouter()

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn()
    } catch (error) {
      console.log(error)
    }
  }

  const handleGoogleSignOut = async () => {
    try {
      await googleSignOut()
      router.push('/')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="mx-8 my-4 z-10 flex items-center justify-between shadow"
    >
      <Link href="/">
        <h1 className="text-2xl font-bold">FavFood</h1>
      </Link>
      <div>
        {user ? (
          <div className="flex items-center justify-between gap-4">
            <Link
              href="/favouritefoods"
              className="px-4 py-2 bg-red-600 rounded-md"
            >
              Favourites &hearts;
            </Link>
            <button
              onClick={handleGoogleSignOut}
              className="px-4 py-2 bg-[#FF9500] text-white rounded-lg"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <button
            onClick={handleGoogleSignIn}
            className="px-4 py-2 bg-[#FF9500] text-white rounded-lg"
          >
            Sign In
          </button>
        )}
      </div>
    </motion.div>
  )
}

export default Navbar
