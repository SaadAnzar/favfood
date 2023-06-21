import { useEffect, useState } from 'react'
import Image from 'next/image'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { UserAuth } from '@/context/AuthContext'
import { db } from '@/config/firebase'
import { arrayUnion, doc, updateDoc, getDoc } from 'firebase/firestore'

const Food = ({ food }) => {
  const [saved, setSaved] = useState(false)
  const { user } = UserAuth()

  const foodID = doc(db, 'users', `${user?.uid}`)

  useEffect(() => {
    if (user?.uid) {
      const checkSaved = async () => {
        const docRef = doc(db, 'users', `${user?.uid}`)
        getDoc(docRef).then((docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data()
            const savedFoods = data.favouriteFoods
            const savedFood = savedFoods.find((item) => item.id === food.idMeal)
            if (savedFood) {
              setSaved(true)
            }
          }
        })
      }
      checkSaved()
    } else {
      setSaved(false)
    }
  }, [user?.uid])

  const saveFood = async () => {
    if (user?.uid) {
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
    <div className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2">
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
        {saved ? (
          <FaHeart className="absolute top-4 left-4 text-red-600" />
        ) : (
          <p onClick={saveFood}>
            <FaRegHeart className="absolute top-4 left-4 text-gray-300" />
          </p>
        )}
      </div>
    </div>
  )
}

export default Food
