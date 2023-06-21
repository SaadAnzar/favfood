import { useState } from 'react'
import Image from 'next/image'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { UserAuth } from '@/context/AuthContext'
import { db } from '@/config/firebase'
import { arrayUnion, doc, updateDoc } from 'firebase/firestore'

const Food = ({ food }) => {
  const [like, setLike] = useState(false)
  const [saved, setSaved] = useState(false)
  const { user } = UserAuth()

  const foodID = doc(db, 'users', `${user?.uid}`)

  const saveFood = async () => {
    if (user?.uid) {
      setLike(!like)
      setSaved(true)
      await updateDoc(foodID, {
        favouriteFoods: arrayUnion({
          id: food.idMeal,
          title: food.strMeal,
          img: food.strMealThumb,
        }),
      })
    } else {
      alert('Please Sign In to save your Favourite Foods')
    }
  }

  return (
    <div className="w-[6rem] sm:w-[10rem] md:w-[14rem] lg:w-[20rem] inline-block cursor-pointer relative p-2">
      <Image
        className="w-full h-auto block rounded-md"
        src={food?.strMealThumb}
        alt={food?.strMeal}
        width={280}
        height={420}
      />
      <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100">
        <p className="white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center">
          {food?.strMeal}
        </p>
        <p onClick={saveFood}>
          {like ? (
            <FaHeart className="absolute top-4 left-4 text-red-600" />
          ) : (
            <FaRegHeart className="absolute top-4 left-4 text-gray-300" />
          )}
        </p>
      </div>
    </div>
  )
}

export default Food
