import "./Productcards.css";
import { Link } from "react-router-dom";
import { cardsData } from "./CardData";
const Productcards = () => {
  // const [cardsData, setCardsData] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const collectinRef = collection(db, "events");
  //     try {
  //       setLoading(true);
  //       const querySnapshot = await getDocs(collectinRef);
  //       const docData = querySnapshot.docs.map((doc) => ({
  //         id: doc.id,
  //         ...doc.data(),
  //       }));
  //       console.log(docData);
  //       setCardsData(docData);
  //     } catch (error) {
  //       setError(error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    <div className="product-cards-container">
      {cardsData &&
        cardsData.map((card, index) => (
          <div key={index} className="product-card">
            <img src={card.images[0]} loading="lazy" />
            <div className="product-information">
              <h2>{card.title}</h2>
              <div className="pc">
                <p>Price: &#x20B9;{card.price}</p>
                <Link
                  to={`/view/${card.id}`}
                  // state={{
                  //   state: {
                  //     pname: productNames[index],
                  //     price: productPrices[index],
                  //     image: images[index],
                  //   },
                  // }}
                >
                  <button>View Details</button>
                </Link>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Productcards;
