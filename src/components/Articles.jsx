import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebaseConfig";
import DeleteArticle from "./DeleteArticle";

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [user] = useAuthState(auth);

  useEffect(() => {
    const fetchArticles = async () => {
      const articleRef = collection(db, "Articles");
      const q = query(articleRef, orderBy("createdAt", "desc"));
      onSnapshot(q, (snapshot) => {
        const articlesData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setArticles(articlesData);
      });
    };

    fetchArticles();
  }, []);

  return (
    <div>
      {articles.length === 0 ? (
        <p>No articles found!</p>
      ) : (
        articles.map(({ id, title, createdBy, createdAt, imageUrl, userId }) => (
          <div key={id} className="border mt-3 p-3 bg-light">
            <div className="row">
              <div className="col-3">
                <img
                  src={imageUrl}
                  alt={title}
                  style={{ height: 100, width: "auto" }}
                />
              </div>
              <div className="col-9">
                <Link to={`/article/${id}`} className="text-decoration-none">
                  <h3>{title}</h3>
                </Link>
                <p>Author: {createdBy}</p>
                <p>Posted on: {createdAt.toDate().toDateString()}</p>
                {user && user.uid === userId && (
                  <div className="d-flex flex-row-reverse">
                    <DeleteArticle id={id} imageUrl={imageUrl} />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Articles;
