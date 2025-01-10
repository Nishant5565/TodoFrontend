"use client";

import AddDelivery from '@/components/AddDelivery/AddDeliver';
import MealPreparation from '@/components/MealPreparation/MealPrepartion'
import React, { useEffect, useState } from 'react'

const page = () => {



  return (

     <div className='flex w-full sm:flex-row flex-col'>
     <div className='md:w-2/3 w-full'>
     <MealPreparation isDelivery ={false} isPantry = {false} isManager = {true} />
     </div>
     <div className='md:w-1/3 w-full'>
          <h2 className='text-2xl font-bold mt-4'>
           Delivery Personal 
          </h2>

          <div className=' flex flex-col p-6'>
               <AddDelivery   />
          </div>
     </div>
</div>
  )
}

export default page