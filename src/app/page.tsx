'use client';

import Navbar from '@/components/Navbar/Navbar';
import Sidebar from '@/components/SideBar/SideBar';
import React, {useEffect, useState} from 'react'

const page = () => {

  useEffect(() => {
    const isCollapsed = localStorage.getItem('isCollapsed');
    const theme = localStorage.getItem('theme');

    if (!theme) {
      localStorage.setItem('theme', 'Light');
    }


  } ,[])


  return (
    <div>
      
    </div>
  )
}

export default page