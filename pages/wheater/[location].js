import React from 'react';
import { useRouter } from 'next/router';
import Home from '../../components/Home';
const location = () => {
  const router = useRouter();
  console.log(router);
  return <Home location={router?.query?.location} />;
};

export default location;
