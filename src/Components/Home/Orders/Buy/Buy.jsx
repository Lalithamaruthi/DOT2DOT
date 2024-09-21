/* eslint-disable no-unused-vars */
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./Buy.css";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../../Navbar/Navbar";
import { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { db } from "../../../../Firebase/Firebse";
import { doc, getDoc } from "firebase/firestore";
import axios from "axios";
import { useUserAuth } from "../../../../AuthContex/AuthContext";
import { toast } from "react-toastify";
const Buy = () => {
  // const buyImages = [img1, img2, img3];
  const { currentUser } = useUserAuth();
  const [isPopup, setIsPopup] = useState(false);
  const { id } = useParams();
  const [card, setCard] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const pattern = new RegExp(/^\d{1,10}$/);

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowFormatted = tomorrow.toISOString().split("T")[0];

  useEffect(() => {
    const fetchDoc = async () => {
      const docRef = doc(db, "events", id);
      try {
        setLoading(true);
        const docSnap = await getDoc(docRef);
        setCard(docSnap.data());
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoc();
    //eslint-disable-next-line
  }, []);

  const handlePopupOpen = () => {
    console.log(currentUser);
    if (currentUser == null) {
      sessionStorage.setItem("previousRoute", `/view/${id}`);
      navigate("/login");
      return;
    }
    setIsPopup(true);
  };

  const BuyForm = () => {
    const [formData, setFormData] = useState({
      name: "",
      address: "",
      phoneNumber: "",
      altPhoneNumber: "",
      date: "",
      time: "",
      confirm: false,
    });
    const handleChange = (e) => {
      const { name, value, type, checked } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: type === "checkbox" ? checked : value,
      }));
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (
        !formData.name ||
        !formData.address ||
        !formData.phoneNumber ||
        !formData.altPhoneNumber ||
        !formData.date ||
        !formData.time
      ) {
        toast.warn("Fill all fields");
        return;
      }

      if (!formData.confirm) {
        toast.warn("Mark the check box");
        return;
      }

      if (
        formData.phoneNumber.length !== 10 ||
        !pattern.test(formData.phoneNumber)
      ) {
        toast.warn("Invalid phone number");
        return;
      }

      if (
        formData.altPhoneNumber.length !== 10 ||
        !pattern.test(formData.altPhoneNumber)
      ) {
        toast.warn("Invalid ulternative phone number");
        return;
      }

      // const accessToken = import.meta.env.VITE_ACCESS_TOKEN;

      // // Sanitize the text parameter
      // const sanitizedName = formData.name.replace(/[\n\t]/g, ""); // Remove new-line and tab characters
      // const sanitizedPhoneNumber = formData.phoneNumber.replace(/[\n\t]/g, ""); // Remove new-line and tab characters
      // const sanitizedTitle = card.title.replace(/[\n\t]/g, ""); // Remove new-line and tab characters

      // const msg = `Order request from ${sanitizedName}: They want to book a slot for ${sanitizedTitle} on ${formData.date}. Their mobile number is ${sanitizedPhoneNumber}`;

      // const payload = {
      //   messaging_product: "whatsapp",
      //   to: "917676643480",
      //   type: "template",
      //   template: {
      //     name: "message_passing",
      //     language: {
      //       code: "en",
      //       policy: "deterministic",
      //     },
      //     components: [
      //       {
      //         type: "body",
      //         parameters: [
      //           {
      //             type: "text",
      //             text: msg,
      //           },
      //         ],
      //       },
      //     ],
      //   },
      // };

      try {
        //   const response = await axios.post(
        //     "https://graph.facebook.com/v18.0/223753224161171/messages",
        //     payload,
        //     {
        //       headers: {
        //         Authorization: `Bearer ${accessToken}`,
        //         "Content-Type": "application/json",
        //       },
        //     }
        //   );
        //   console.log(response.data);
        const response = await axios.post(
          "https://dot2dot-events-backend.vercel.app/api/send-email",
          { title: card?.title, ...formData }
        );
        if (response.status === 200) {
          toast.success("Order confirmed");
          setIsPopup(false);
        } else {
          toast.error("Something went wrong");
        }
      } catch (error) {
        console.error("Error:", error.response);
        toast.error("Something went wrong");
      }
    };

    return (
      <div className="form-container">
        <span>
          {" "}
          <CloseIcon onClick={() => setIsPopup(false)} />{" "}
        </span>
        <h2>Contact Information</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phoneNumber">Phone:</label>
            <input
              type="number"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="altPhoneNumber">Alternative Phone:</label>
            <input
              type="number"
              id="altPhoneNumber"
              name="altPhoneNumber"
              value={formData.altPhoneNumber}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              min={tomorrowFormatted}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="time">Time:</label>
            <input
              type="time"
              id="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
            />
          </div>

          <div
            style={{
              padding: "0 0 15px 0",
              margin: "auto",
            }}
          >
            <input
              type="checkbox"
              id="confirm"
              name="confirm"
              checked={formData.confirm}
              onChange={handleChange}
              required
              className="checkbox-custom"
            />
            <label style={{ paddingLeft: "10px" }}>Check to Confirm</label>
          </div>

          <button type="submit">Buy</button>
        </form>
      </div>
    );
  };

  return (
    <>
      <Navbar />
      {isPopup && (
        <div className="buy-form-popup">
          <BuyForm />
        </div>
      )}
      <div className="buy-container">
        <div className="image-carousel-container">
          <Carousel
            infiniteLoop
            autoPlay
            showStatus={false}
            showArrows={false}
            showThumbs={true}
            interval={3500}
            stopOnHover={false}
          >
            {card.images &&
              card.images.map((img, index) => (
                <div className="buy-carousel-image-container" key={index}>
                  <img src={img} alt={`buy-item`} />
                </div>
              ))}
          </Carousel>
        </div>
        <div className="small">
          <div className="small-div">
            <ul className="custom-list">
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">Products</a>
              </li>
              <li>
                <a href="#">Birthday Decor</a>
              </li>
            </ul>
            <p className="small-font">colorful birthday decoration</p>
            <h2>{card?.title}</h2>

            <p>
              Create an elegant atmosphere for a birthday party with our
              colorful theme birthday decor.
            </p>
          </div>
          <div className="small-div1">
            <h2>Inclusions</h2>
            <hr />
            <ul>
              {card.inclusions &&
                card.inclusions.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
            </ul>
            <p>
              Let us transform your vision into reality, wherever and whenever
              inspiration strikes.{" "}
            </p>
            {/* <Link to="/buyform"> */}
            <button onClick={handlePopupOpen} className="button">
              Buy Now &#8594;
            </button>
            {/* </Link> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Buy;
