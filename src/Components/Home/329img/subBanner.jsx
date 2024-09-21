import "./subBanner.css";
import c1 from "./subimg/c1.jpg";
import c2 from "./subimg/c2.jpg";
import c3 from "./subimg/c3.jpg";
import c4 from "./subimg/c4.jpg";
import c5 from "./subimg/c5.jpg";
import c6 from "./subimg/c6.jpg";
import c7 from "./subimg/c7.jpg";
import c8 from "./subimg/c8.jpg";
import c9 from "./subimg/c9.jpg";


const SubBanner = () => {
  const cards = [
    { imageName: "Birthday", imgSrc: c1 },
    { imageName: "Anniversary", imgSrc: c2 },
    { imageName: "Baby Shower", imgSrc: c3 },
    { imageName: "Welcome Baby", imgSrc: c4 },
    { imageName: "Party Decoration", imgSrc: c5 },
    { imageName: "Suprise", imgSrc: c6 },
    { imageName: "Engagement", imgSrc: c7 },
    { imageName: "House Warming", imgSrc: c8 },
    { imageName: "First Night Decoration", imgSrc: c9 },
  ];


  return (
    <div className="image-card-container">
      {cards.map((card, index) => (
        <div className="image-card" data-name={card.imageName} key={index}>
          <img src={card.imgSrc} alt={card.imageName} />
        </div>
      ))}
    </div>
  );
};

export default SubBanner;
