
import "./Home.css";
import Myycarousel from "../Myycarousel/Myycarousel";
// import Imagecard1 from "./Imagecard1/Imagecard1";
// import Imagecard2 from "./Imagecard2/Imagecard2";
import Head1 from "./heading/Head1";
import Productcards from "./Productcards/Productcards";
import Review from './Review/Review';
// import Card3image from "./Card3image/Card3image";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
// import Card3image2 from './Card3image2/Card3image2'
// import Card3image3 from './Card3image3/Card3image3'
// import Buy from './Orders/Buy/Buy'
import SubBanner from "./329img/subBanner"

function Home() {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Navbar />
      <Myycarousel />
      <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
        {/* <Imagecard1 />  */}

        <SubBanner />


        {/* <Card3image />
        <Card3image2 />
        <Card3image3/> */}

        {/* <Card3image2 /> */}
        {/* <Imagecard2 /> */}
        <Head1/>
        <Productcards />
        {/* uncommment this once the testing is dome */}
        
        {/* <BuyForm /> */}
        {/* <Buy/> */}
        <Review />
        <Footer />

      </div>
    </div>
  );
}

export default Home;
