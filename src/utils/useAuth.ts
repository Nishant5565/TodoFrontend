"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authUser } from '@/features/auth/auth';
import { RootState, AppDispatch } from '@/app/store';
import { toast } from 'sonner';

const useAuth = () => {
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const token = typeof window !== 'undefined' ? sessionStorage.getItem('token') : null;

  useEffect(() => {
    if (!user && token) {
     dispatch(authUser()).then((result: any) => {
        if (authUser.rejected.match(result)) {
          toast.error('Failed to authenticate', { description: result.error.message });
        }
        else if (authUser.fulfilled.match(result)) {
          toast.success("Logged in successfully", { description: "You are now logged in" });
        }
     });
    }
  }, [user, token, dispatch]);
};

export default useAuth;