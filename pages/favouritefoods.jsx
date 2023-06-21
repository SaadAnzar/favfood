import { useState, useEffect } from 'react'
import Layout from '@/components/Layout'
import Navbar from '@/components/Navbar'
import { UserAuth } from '@/context/AuthContext'
import { db } from '@/config/firebase'
import { updateDoc, doc, onSnapshot } from 'firebase/firestore'
import { AiOutlineClose } from 'react-icons/ai'
import Image from 'next/image'

export default function FavouriteFoods() {
  const [foods, setFoods] = useState([])

  const { user } = UserAuth()

  useEffect(() => {
    onSnapshot(doc(db, 'users', `${user?.uid}`), (doc) => {
      setFoods(doc.data()?.favouriteFoods)
    })
  }, [user?.uid])

  const foodRef = doc(db, 'users', `${user?.uid}`)
  const removeFood = async (passedId) => {
    try {
      const result = foods.filter((food) => food.id !== passedId)
      await updateDoc(foodRef, {
        favouriteFoods: result,
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Layout>
      <Navbar />
      <div>
        <div className="text-center my-4">
          <h1 className="text-2xl">
            Welcome
            <span className="font-bold"> {user?.displayName} !</span>
          </h1>
          <h1 className="text-xl">Here are your favourite foods</h1>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {foods?.map((food) => (
            <div
              key={food.id}
              className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2"
            >
              <Image
                className="w-full h-auto block"
                src={food?.img}
                alt={food?.title}
                width={280}
                height={420}
              />
              <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white">
                <p className="white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center">
                  {food?.title}
                </p>
                <p
                  onClick={() => removeFood(food.id)}
                  className="absolute text-gray-300 top-4 right-4"
                >
                  <AiOutlineClose />
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}
