import { auth, db, storage } from "../../config/firebaseConfig";
import { ref, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";

let wasExecuted = false;

const getItemsFromFirestore = async (itemCallback, categoryCallback) => {
  if (wasExecuted) return;
  wasExecuted = true;

  try {
    const email = auth.currentUser?.email;
    if (!email) return;

    const snapshot = await db
      .collection("users")
      .doc(email)
      .collection("items")
      .get();
    snapshot.forEach(async (item) => {
      const imageRef = ref(storage, `${email}/items/${item.id}`);
      try {
        const itemImage = await getDownloadURL(imageRef);
        let category = item.get("category");
        categoryCallback(category);
        itemCallback({
          id: item.id,
          name: item.get("name"),
          units: item.get("units"),
          imageURL: itemImage,
          category: category,
          cost: item.get("cost"),
          price: item.get("price"),
          units_limit: item.get("units_limit"),
        });
      } catch (imageError) {
        // Handle error when fetching image
        console.error("Error fetching image:", imageError);
      }
    });
  } catch (error) {
    // Handle general error
    console.error("Error getting items:", error);
  }
};

const addItem = async (
  itemName,
  category,
  price,
  cost,
  units,
  unitsLimit,
  image,
  callback
) => {
  if (
    itemName === null ||
    itemName.length === 0 ||
    category === null ||
    category.length === 0 ||
    price === null ||
    cost === null ||
    units === null
  )
    return;

  const item = {
    name: itemName,
    units: units,
    category: category,
    cost: cost,
    price: price,
    units_limit: unitsLimit,
  };

  try {
    const email = auth.currentUser?.email;
    if (email) {
      const docRef = await addDoc(collection(db, `users/${email}/items`), item)
        .then(async (itemFirestore) => {
          if (image !== null) {
            console.log(`images/${itemFirestore.id}.jpeg`);
            const storageRef = storage.ref(`images/${itemFirestore.id}.jpeg`);
            const snapshot = await storageRef.put(image);
            item["imageURL"] = await snapshot.ref.getDownloadURL();
          } else item["imageURL"] = null;
          item["id"] = itemFirestore.id;
          callback(item);
        })
        .catch(() => alert("There was an error. Item wasnt added."));
    } else alert("Auth error. Item wasnt added.");
  } catch {
    console.error("Auth error");
  }
};

const deleteItem = async (itemID, callback, errorCallback) => {
  let email = auth.currentUser === null ? null : auth.currentUser.email;
  if (email !== null) {
    db.collection("users")
      .doc(email)
      .collection("items")
      .doc(itemID)
      .delete()
      .then(callback)
      .catch(errorCallback);
  } else {
    alert(errorCallback);
  }
};

export { getItemsFromFirestore, addItem, deleteItem };
