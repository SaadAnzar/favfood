import { useState, useEffect } from 'react'
import Head from 'next/head'
import { Inter } from 'next/font/google'
import Layout from '@/components/Layout'
import Navbar from '@/components/Navbar'
import Food from '@/components/Food'
import axios from 'axios'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [foods, setFoods] = useState([])

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await axios.get(
          'https://www.themealdb.com/api/json/v1/1/search.php?f=c'
        )
        setFoods(response.data.meals)
      } catch (error) {
        console.error('Error fetching meals:', error)
      }
    }

    fetchFoods()
  }, [])

  return (
    <Layout>
      <Head>
        <title>FavFood</title>
        <meta name="description" content="Save your favourite food" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main className={`${inter.className} m-8`}>
        <div className="grid grid-cols-4 gap-4">
          {foods.map((food) => (
            <Food key={food.idMeal} food={food} />
          ))}
        </div>
      </main>
    </Layout>
  )
}
