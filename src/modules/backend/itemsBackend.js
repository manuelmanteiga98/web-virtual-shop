import { auth, db, storage } from "../../config/firebaseConfig";
import {
  ref,
  getDownloadURL,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";

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
      try {
        categoryCallback(item.get("category"));
        const imageRef = ref(storage, `${email}/items/${item.id}`);
        const itemImage = await getDownloadURL(imageRef);
        itemCallback({
          id: item.id,
          name: item.get("name"),
          units: item.get("units"),
          imageURL: itemImage,
          category: item.get("category"),
          cost: item.get("cost"),
          price: item.get("price"),
          units_limit: item.get("units_limit"),
        });
      } catch (imageError) {
        itemCallback({
          id: item.id,
          name: item.get("name"),
          units: item.get("units"),
          imageURL: null,
          category: item.get("category"),
          cost: item.get("cost"),
          price: item.get("price"),
          units_limit: item.get("units_limit"),
        });
      }
    });
  } catch (error) {
    // Handle general error
    console.error("Error getting items:", error);
  }
};

const addItem = async (
  itemID,
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
    itemID === null ||
    itemName === null ||
    itemName.length === 0 ||
    category === null ||
    category.length === 0 ||
    price === null ||
    cost === null ||
    units === null
  )
    return;

  const item = Object.create(null);
  item.name = itemName;
  item.units = units;
  item.category = category;
  item.cost = cost;
  item.price = price;
  item.units_limit = unitsLimit;

  try {
    const email = auth.currentUser?.email;
    if (email) {
      await setDoc(doc(db, `users/${email}/items`, itemID), item)
        .then(async () => {
          item.id = itemID;
          if (image !== null) {
            const storageRef = ref(storage, `${email}/items/${itemID}`);

            const uploadTask = uploadBytes(storageRef, image);
            uploadTask
              .then(() => {
                getDownloadURL(storageRef).then((downloadURL) => {
                  console.log("File available at", downloadURL);
                  item.imageURL = downloadURL;
                  callback(item);
                });
              })
              .catch((error) => {
                console.error("Error uploading file", error);
                item.imageURL = null;
                callback(item);
              });
          } else {
            item.imageURL = null;
            callback(item);
          }
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
      .then(() => {
        const storageRef = ref(storage, `${email}/items/${itemID}`);
        deleteObject(storageRef);
        callback();
      })
      .catch(errorCallback);
  } else {
    alert(errorCallback);
  }
};

export { getItemsFromFirestore, addItem, deleteItem };
