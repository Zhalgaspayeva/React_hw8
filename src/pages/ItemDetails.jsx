// import { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import { searchDetails } from "../services/itemsService";
// import Spinner from "../components/Spinner";
// import ErrorBox from "../components/ErrorBox";
// import "../styles/Items.css";

// const ItemDetails = () => {
//   const { id } = useParams();
//   const [character, setCharacter] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchDetails = async () => {
//       try {
//         const data = await searchDetails(id);
//         setCharacter(data);
//       } catch {
//         setError("Character not found!");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDetails();
//   }, [id]);

//   if (loading) return <Spinner />;
//   if (error) return <ErrorBox message={error} />

//   return (
//     <div style={{ padding: "40px", fontFamily: "sans-serif" }}>
//       <Link to="/items" style={{ display: "inline-block", marginBottom: "20px" }}>
//         ⬅ Back to list
//       </Link>

//       <div style={{ display: "flex", gap: "30px", alignItems: "center" }}>
//         <img
//           src={character.image}
//           alt={character.name}
//           style={{
//             width: "200px",
//             height: "200px",
//             borderRadius: "10px",
//             objectFit: "cover",
//           }}
//         />
//         <div>
//           <h2>{character.name}</h2>
//           <p>
//             <strong>Status:</strong> {character.status}
//           </p>
//           <p>
//             <strong>Species:</strong> {character.species}
//           </p>
//           <p>
//             <strong>Gender:</strong> {character.gender}
//           </p>
//           <p>
//             <strong>Origin:</strong> {character.origin?.name}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ItemDetails;


import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchItemById } from "../features/items/itemsSlice";
import Spinner from "../components/Spinner";
import ErrorBox from "../components/ErrorBox";
import "../styles/Items.css";

const ItemDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { selectedItem, loadingItem, errorItem } = useSelector(
    (state) => state.items
  );

  useEffect(() => {
    dispatch(fetchItemById(id));
  }, [dispatch, id]);

  if (loadingItem) return <Spinner />;
  if (errorItem) return <ErrorBox message={errorItem} />;
  if (!selectedItem) return <ErrorBox message="Character not found!" />;

  const char = selectedItem;

  return (
    <div style={{ padding: "40px", fontFamily: "sans-serif" }}>
      <Link to="/items" style={{ display: "inline-block", marginBottom: "20px" }}>
        ⬅️ Back to list
      </Link>

      <div style={{ display: "flex", gap: "30px", alignItems: "center" }}>
        <img
          src={char.image}
          alt={char.name}
          style={{
            width: "200px",
            height: "200px",
            borderRadius: "10px",
            objectFit: "cover",
          }}
        />
        <div>
          <h2>{char.name}</h2>
          <p>
            <strong>Status:</strong> {char.status}
          </p>
          <p>
            <strong>Species:</strong> {char.species}
          </p>
          <p>
            <strong>Gender:</strong> {char.gender}
          </p>
          <p>
            <strong>Origin:</strong> {char.origin?.name}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;