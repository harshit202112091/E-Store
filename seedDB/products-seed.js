const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });
const Product = require("../models/product");
const Category = require("../models/category");
const mongoose = require("mongoose");
const faker = require("faker");
const connectDB = require("./../config/db");
connectDB();

async function seedDB() {
  faker.seed(0);

  //----------------------Backpacks
  const backpacks_titles = [
    "Tablet",
    "Black Iphone",
    "Iphone",
    "Samsung",
    "Nokia",
    "Apple Iphone",
    "Iphone",
    "Samsung F21",
    "Samsung",
    "Iphone",
  ];
  const backpacks_imgs = [
    "https://cdn.pixabay.com/photo/2015/01/18/13/31/tablet-602968_960_720.jpg",
    "https://www.pikrepo.com/ffthh/black-iphone-4.jpg",
    "https://c.pxhere.com/photos/75/49/smartphone_cellphone_apple_i_phone_mobile_communication_social_media_technology_mobile_phones-1265489.jpg!d",
    "https://c.pxhere.com/photos/d0/b3/ios_new_mobile_gadget_pad_smartphone_time_technology-668852.jpg!d",
    "https://c.pxhere.com/photos/4f/53/macbook_notebook_home_office_workstation_office_blogging_writing_author-970905.jpg!d",
    "https://m.media-amazon.com/images/I/71gm8v4uPBL._SX522_.jpg",
    "https://images.moneycontrol.com/static-mcnews/2021/10/Apple-iPhone-13-4.jpg",
    "https://aniportalimages.s3.amazonaws.com/media/details/Galaxy-Z-Fold-3.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSskkRp-i69NqNxG5ZnImyfzjXcAYnwQyfyGA&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFJhgFeAGynhNCq3wiY8iJNFTVrvU1W_3Bcw&usqp=CAU",
  ];

 

  

  //--------------------Briefcases
  const briefcases_titles = [
    "Men Casual Shirt",
    "Men Casual Shirt",
    "Men Casual Shirt",
    "Men Casual Shirt",
  ];

  const briefcases_imgs = [
    "https://m.media-amazon.com/images/I/618Wek95laS._AC_UL480_FMwebp_QL65_.jpg",
    "https://m.media-amazon.com/images/I/61DGAlvxRLL._AC_UL480_FMwebp_QL65_.jpg",
    "https://m.media-amazon.com/images/I/61WrmjKbNzS._AC_UL480_FMwebp_QL65_.jpg",
    "https://m.media-amazon.com/images/I/51yIybqYFTL._AC_UL480_FMwebp_QL65_.jpg",
  ];

 
  

  //--------------------Large Handags

  const largeHandbags_titles = [
    "Blue Bedsheet",
    "Royal Bedsheet",
    "Plastic Containers",
    "Pack of Bottles",
    
  ];
  const largeHandbags_imgs = [
    "https://images-eu.ssl-images-amazon.com/images/G/31/IMG19/Home/W1/XCM_Manual_1204564_in_home_furniture_11-12-19_8_440x460_1576065274._CB444700404_.jpg",
    "https://images-eu.ssl-images-amazon.com/images/G/31/IMG19/Home/W1/XCM_Manual_1204564_in_home_furniture_11-12-19_20_440x460_1576216970._CB444701816_.jpg",
    "https://m.media-amazon.com/images/I/51YQcD93OEL.jpg",
    "https://m.media-amazon.com/images/I/41jXz+dId5S.jpg",
    
  ];

  //-----------------------Purses
  const purses_titles = [
    "Sandisk USB Pendrive",
    "HP - Wired Mouse",
    "Lenovo CPU",
    "Apple iMac",
    
  ];
  const purses_imgs = [
    "https://m.media-amazon.com/images/I/61DjwgS4cbL._AC_UL480_QL65_.jpg",
    "https://m.media-amazon.com/images/I/61KSceiLHwL._AC_UL480_QL65_.jpg",
    "https://images-eu.ssl-images-amazon.com/images/I/41lWTNCKJqL._AC._SR360,460.jpg",
    "https://images-eu.ssl-images-amazon.com/images/I/61LNnZPoKPS._AC._SR360,460.jpg",
    
  ];

  //-----------------Totes

  const totes_titles = [
    "White Dotted Curtains",
    "Vegetable Basket",
    "Wall Clock",
    "Wall Hanging",
    
  ];
  const totes_imgs = [
    "https://m.media-amazon.com/images/I/517FQ7bOvlL.jpg",
    "https://m.media-amazon.com/images/I/41DB4J6DiQL.jpg",
    "https://images-eu.ssl-images-amazon.com/images/I/51xRLeX-gtL._AC_SX184_.jpg",
    "https://images-eu.ssl-images-amazon.com/images/G/31/IMG19/Home/bau/Decor/wallhanging._CB427167284_.jpg",
    
  ];

  async function seedProducts(titlesArr, imgsArr, categStr) {
    try {
      const categ = await Category.findOne({ title: categStr });
      for (let i = 0; i < titlesArr.length; i++) {
        let prod = new Product({
          productCode: faker.helpers.replaceSymbolWithNumber("####-##########"),
          title: titlesArr[i],
          imagePath: imgsArr[i],
          description: faker.lorem.paragraph(),
          price: faker.random.number({ min: 10, max: 50 }),
          manufacturer: faker.company.companyName(0),
          available: true,
          category: categ._id,
        });
        await prod.save();
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async function closeDB() {
    console.log("CLOSING CONNECTION");
    await mongoose.disconnect();
  }

  await seedProducts(backpacks_titles, backpacks_imgs, "Electronics");
  await seedProducts(briefcases_titles, briefcases_imgs, "Men's Wear");
  //await seedProducts(travel_titles, travel_imgs, "Women's Wear");
  //await seedProducts(miniBags_titles, miniBags_imgs, "Kids");
  await seedProducts(
    largeHandbags_titles,
    largeHandbags_imgs,
    "Kitchen"
  );
  await seedProducts(purses_titles, purses_imgs, "Computers");
  await seedProducts(totes_titles, totes_imgs, "Household");

  await closeDB();
}

seedDB();
