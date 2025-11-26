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

import { fetchItemDetails } from "../features/items/itemsSlice";
import Spinner from "../components/Spinner";
import ErrorBox from "../components/ErrorBox";
import "../styles/Items.css";

const ItemDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { selectedItem, loading, error } = useSelector((state) => state.items);

  useEffect(() => {
    if (id) {
      dispatch(fetchItemDetails(id));
    }
  }, [dispatch, id]);

  if (loading) return <Spinner />;
  if (error) return <ErrorBox message={error} />;

  if (!selectedItem) return null;

  return (
    <div style={{ padding: "40px", fontFamily: "sans-serif" }}>
      <Link to="/items" style={{ display: "inline-block", marginBottom: "20px" }}>
        ⬅️ Back to list
      </Link>

      <div style={{ display: "flex", gap: "30px", alignItems: "center" }}>
        <img
          src={selectedItem.image}
          alt={selectedItem.name}
          style={{
            width: "200px",
            height: "200px",
            borderRadius: "10px",
            objectFit: "cover",
          }}
        />
        <div>
          <h2>{selectedItem.name}</h2>
          <p>
            <strong>Status:</strong> {selectedItem.status}
          </p>
          <p>
            <strong>Species:</strong> {selectedItem.species}
          </p>
          <p>
            <strong>Gender:</strong> {selectedItem.gender}
          </p>
          <p>
            <strong>Origin:</strong> {selectedItem.origin?.name}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;