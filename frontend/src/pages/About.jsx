import React from "react";
import Team from "../components/Team";


const About = () => {
  return (
    <div>
    <section className="bg-gray-100 py-8 mt-14">
      <div className="container mx-auto">
      <div className="mx-auto max-w-screen-sm text-center mb-8 lg:mb-8 ">
        <hr />
        <br />
        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 ">
          About Us
        </h2>
        
        <hr />
      </div>        
        <hr />
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/2 px-4 mb-4 rounded-md border border-yellow-300">
            <h3 className="text-xl font-bold mb-2 text-red-600">Our Story</h3>
            <p className="text-gray-700">
              Once upon a time, four passionate food lovers came together with a common vision - to provide delicious food right at your doorstep. Our journey started with a shared love for culinary delights and a strong desire to bring convenience to our customers' lives. With each member bringing their unique expertise and skills to the table, we embarked on the adventure of creating a food delivery service that would revolutionize the industry.
            </p>
          </div>
          <div className="w-full md:w-1/2 px-4 mb-4  rounded-sm border border-yellow-300">
            <h3 className="text-xl font-bold mb-2 text-red-600">Our Values</h3>
            <ul className="list-disc list-inside text-gray-700">
              <li>Quality: We are committed to providing the highest quality of food to our customers.</li>
              <li>Reliability: We strive to deliver your favorite meals on time, every time.</li>
              <li>Customer Satisfaction: Your satisfaction is our top priority, and we go the extra mile to exceed your expectations.</li>
              <li>Innovation: We continuously innovate and improve our services to enhance your dining experience.</li>
            </ul>
          </div>
        </div>
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/2 px-4 mb-4 rounded-sm border border-yellow-300">
            <h3 className="text-xl font-bold mb-2 text-red-600">Our Services</h3>
            <p className="text-gray-700">
              At our company, we offer a wide range of services to cater to your culinary cravings. Whether you're looking for a quick bite, a family meal, or a gourmet dining experience, we've got you covered. Our dedicated team of chefs and delivery personnel work tirelessly to ensure that your food arrives fresh and flavorful, right at your doorstep.
            </p>
          </div>
          <div className="w-full md:w-1/2 px-4 mb-4 rounded-sm border border-yellow-300">
            <h3 className="text-xl font-bold mb-2 text-red-600">Our Vision and Mission</h3>
            <p className="text-gray-700">
              Our vision is to become the go-to food delivery service, known for our exceptional quality, reliability, and customer satisfaction. We aim to revolutionize the way people experience food delivery by constantly pushing boundaries and introducing innovative solutions. Our mission is to provide a seamless and delightful dining experience, making every meal memorable for our valued customers.
            </p>
          </div>
        </div>
      </div>
    </section>
  <Team />
    </div>
  );
};

export default About;