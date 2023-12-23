import { auth, db } from "../../config/firebaseConfig";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

const getItems = async (callback) => {
  let email = auth.currentUser === null ? null : auth.currentUser.email;
  let items = [];
  const storage = getStorage();
  if (email !== null)
    db.collection("users")
      .doc(email)
      .collection("items")
      .get()
      .then(async (lista) => {
        // Use Promise.all to wait for all asynchronous operations to complete
        const itemPromises = [];
        lista.forEach((item) => {
          const imageRef = ref(storage, `${email}/items/${item.id}`);
          const downloadUrlPromise = getDownloadURL(imageRef)
            .then((url) => url)
            .catch(() => {
              return null;
            });

          itemPromises.push(
            downloadUrlPromise.then((itemImage) => {
              return {
                id: item.id,
                name: item.get("name"),
                units: item.get("units"),
                imageURL: itemImage,
                category: item.get("category"),
                cost: item.get("cost"),
                price: item.get("price"),
                units_limit: item.get("units_limit"),
              };
            })
          );
        });

        // Wait for all promises to resolve before continuing
        items = await Promise.all(itemPromises);
        callback(items);
      })
      .catch((error) => {
        console.error("Error getting items:", error);
        callback(items);
      });
};

export { getItems };
