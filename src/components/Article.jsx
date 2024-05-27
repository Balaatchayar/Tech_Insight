import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useParams } from "react-router-dom";
import { auth, db } from "../firebaseConfig";
import LikeArticle from "./LikeArticle";
import Comment from './Comment';

export default function Article() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [user] = useAuthState(auth);
  const [editMode, setEditMode] = useState(false);
  const [newDescription, setNewDescription] = useState("");

  useEffect(() => {
    const docRef = doc(db, "Articles", id);
    const unsubscribe = onSnapshot(docRef, (snapshot) => {
      setArticle({ ...snapshot.data(), id: snapshot.id });
      setNewDescription(snapshot.data().description);
    });

    return () => unsubscribe();
  }, [id]);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setNewDescription(article.description);
  };

  const handleDescriptionChange = (event) => {
    setNewDescription(event.target.value);
  };

  const handleUpdateDescription = async () => {
    try {
      const articleDocRef = doc(db, "Articles", id);
      await updateDoc(articleDocRef, { description: newDescription });
      setEditMode(false);
    } catch (error) {
      console.error("Error updating description:", error);
    }
  };

  return (
    <div className="container border bg-light" style={{ marginTop: 70 }}>
      {article && (
        <div className="row">
          <div className="col-3">
            <img
              src={article.imageUrl}
              alt={article.title}
              style={{ width: "100%", padding: 10 }}
            />
          </div>
          <div className="col-9 mt-3">
            <h2>{article.title}</h2>
            <h5>Author: {article.createdBy}</h5>
            <div> Posted on: {article.createdAt.toDate().toDateString()}</div>
            <hr />
            {editMode ? (
              <textarea
                value={newDescription}
                onChange={handleDescriptionChange}
                className="form-control mb-2"
                rows="3"
              ></textarea>
            ) : (
              <h4>{article.description}</h4>
            )}

            <div className="d-flex flex-row-reverse">
              {user && user.uid === article.userId && (
                <>
                  {editMode ? (
                    <>
                      <button
                        className="btn btn-outline-secondary me-2"
                        onClick={handleUpdateDescription}
                      >
                        Save
                      </button>
                      <button
                        className="btn btn-outline-danger"
                        onClick={handleCancelEdit}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      className="btn btn-outline-primary"
                      onClick={handleEditClick}
                    >
                      Edit
                    </button>
                  )}
                </>
              )}
              {user && <LikeArticle id={id} likes={article.likes} />}
              <div className="pe-2">
                <p>{article.likes?.length} likes</p>
              </div>
            </div>
            {/* comment  */}
            <Comment id={article.id} />
          </div>
        </div>
      )}
    </div>
  );
}
