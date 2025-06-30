import React from 'react';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { auth } from '@/lib/auth';
import { Homeview } from '@/modules/auth/ui/views/home/ui/views/home-view';

const Page = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if(!session){
    redirect("/sign-in");
  }

  return (
    <Homeview/>
  );
}

export default Page;
