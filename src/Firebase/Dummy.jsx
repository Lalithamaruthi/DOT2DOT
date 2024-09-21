import p1 from "../Components/Home/Productcards/pimg/p1.jpeg";
import p2 from "../Components/Home/Productcards/pimg/p10.jpeg";
import p3 from "../Components/Home/Productcards/pimg/p12.jpeg";
import p4 from "../Components/Home/Productcards/pimg/p13.jpeg";
import p5 from "../Components/Home/Productcards/pimg/p14.jpeg";
import p6 from "../Components/Home/Productcards/pimg/p15.jpeg";
import p7 from "../Components/Home/Productcards/pimg/p19.jpeg";
import p8 from "../Components/Home/Productcards/pimg/p2.jpeg";
import p9 from "../Components/Home/Productcards/pimg/p21.jpeg";
import p10 from "../Components/Home/Productcards/pimg/p22.jpeg";
import p11 from "../Components/Home/Productcards/pimg/p23.jpeg";
import p12 from "../Components/Home/Productcards/pimg/p24.jpeg";
import p13 from "../Components/Home/Productcards/pimg/p25.jpeg";
import p14 from "../Components/Home/Productcards/pimg/p26.jpeg";
import p15 from "../Components/Home/Productcards/pimg/p27.jpeg";
import p16 from "../Components/Home/Productcards/pimg/p29.jpeg";
import p17 from "../Components/Home/Productcards/pimg/p3.jpeg";
import p18 from "../Components/Home/Productcards/pimg/p30.jpeg";
import p19 from "../Components/Home/Productcards/pimg/p31.jpeg";
import p20 from "../Components/Home/Productcards/pimg/p4.jpeg";
import p21 from "../Components/Home/Productcards/pimg/p5.jpeg";
import p22 from "../Components/Home/Productcards/pimg/p7.jpeg";
import p23 from "../Components/Home/Productcards/pimg/p8.jpeg";
import p24 from "../Components/Home/Productcards/pimg/p9.jpeg";
import { getDownloadURL, ref, uploadBytes, uploadString } from "firebase/storage";
import { db, storage } from "./Firebse";
import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";

const data = [
  {
    category: "birthday",
    title: "Birthday 1",
    images: [p1, p2, p3],
    price: 100,
    inclusions: ["Cake", "Table", "Balloons"],
  },
  {
    category: "birthday",
    title: "Birthday 2",
    images: [p2, p3, p4],
    price: 100,
    inclusions: ["Cake", "Table", "Balloons"],
  },
];

const Dummy = () => {
  const [disable, setDisable] = useState(false);

  const handleClick = async () => {
    const category = "birthday";
    const docRef = collection(db, category);
    try {
      setDisable(true);
      data.forEach(async (item) => {
        if (item.category === category) {
          const imgList = [];
          for (const img of item.images) {
            const imgName = img.substring(img.lastIndexOf("/") + 1);
            const imgBlob = await fetch(img).then((res) => res.blob());
            const imgRef = ref(storage, `${category}/${imgName}`);
            await uploadBytes(imgRef, imgBlob).then(async (snapshot) => {
              const downloadURL = await getDownloadURL(snapshot.ref);
              imgList.push(downloadURL);
            });
          }
          await addDoc(docRef, {
            category: item.category,
            title: item.title,
            images: imgList,
            price: item.price,
            inclusions: item.inclusions,
          });
        }
      });
      alert("Uploaded");
    } catch (e) {
      console.error(e);
      alert("Error");
    } finally {
      alert("Done");
      setDisable(false);
    }
  };
  return (
    <div>
      <button onClick={handleClick} disabled={disable}>
        Click
      </button>
    </div>
  );
};

export default Dummy;
