import { auth, db } from "../../config/firebaseConfig";

const getArticles = async (callback) => {
  let email = auth.currentUser === null ? null : auth.currentUser.email;
  let articles = [];
  if (email !== null)
    db.collection("users")
      .doc(auth.currentUser.email)
      .collection("items")
      .get()
      .then((lista) => {
        lista.forEach((item) => {
          articles.push({
            id: item.id,
            name: item.get("name"),
            units: item.get("units"),
          });
        });
        callback(articles);
      });
};

export { getArticles };
