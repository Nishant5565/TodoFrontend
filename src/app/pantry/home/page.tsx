import MealPreparation from '@/components/MealPreparation/MealPrepartion'
import React from 'react'

const page = () => {
  return (

     <MealPreparation isManager= {false} isDelivery ={false} isPantry = {true} />
  )
}

export default page