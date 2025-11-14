import React from 'react';
import Left from './Left';
import Right from './Right';
import Carousel from './Carousel';
import Form from './Form';
import { heroSectionProps, biographySectionProps } from './homeContent';

const Home = () => {
  return (
    <div>
      <Left {...heroSectionProps} />
      <Right {...biographySectionProps} />
      <Carousel />
      <Form heading="Send us a message" InputText1="First Name" InputText2="Last Name" InputText3="Mobile Number" InputText4="Email" message="Message" webLink="/" webText="Send" />
    </div>
  )
}

export default Home;
