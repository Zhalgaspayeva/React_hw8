// import { useEffect, useState } from "react";
// import { searchCharacter } from "../services/itemsService";
// import { Link } from "react-router-dom";
// import Spinner from "../components/Spinner";
// import ErrorBox from "../components/ErrorBox";
// import "../styles/Items.css";

// const ItemsList = () => {
//   const [characters, setCharacters] = useState([]);
//   const [query, setQuery] = useState("");
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const fetchCharacters = async () => {
//     try {
//       setLoading(true);
//       setError("");
//       const data = await searchCharacter(query || "rick", page);
//       setCharacters(data.results || []);
//       setTotalPages(data.info.pages || 1);
//     } catch (err) {
//       setCharacters([]);
//       setError("No characters found!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCharacters();
//   }, [page]);

//   const handleSearch = (e) => {
//     e.preventDefault();
//     setPage(1);
//     fetchCharacters();
//   };

//   return (
//     <div className="items-page">
//       <h2>Character Search</h2>

//       <form onSubmit={handleSearch} className="search-form">
//         <input
//           type="text"
//           placeholder="Enter name..."
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           className="search-input"
//         />
//         <button type="submit" className="search-button">
//           Search
//         </button>
//       </form>

//       {loading && <Spinner />}

//       {error && <ErrorBox message={error} />}

//       {!loading && !error && (
//         <>
//           <div className="characters-grid">
//             {characters.map((char) => (
//               <Link
//                 key={char.id}
//                 to={`/items/${char.id}`}
//                 className="character-card"
//               >
//                 <img src={char.image} alt={char.name} />
//                 <h3>{char.name}</h3>
//                 <p>{char.species}</p>
//               </Link>
//             ))}
//           </div>

//           <div className="pagination">
//             <button
//               disabled={page === 1}
//               onClick={() => setPage((p) => p - 1)}
//             >
//               ⬅ Prev
//             </button>
//             <span>
//               Page {page} of {totalPages}
//             </span>
//             <button
//               disabled={page === totalPages}
//               onClick={() => setPage((p) => p + 1)}
//             >
//               Next ➡
//             </button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default ItemsList;


import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { fetchItems, setQuery, setPage } from "../features/items/itemsSlice";
import Spinner from "../components/Spinner";
import ErrorBox from "../components/ErrorBox";
import "../styles/Items.css";

const ItemsList = () => {
  const dispatch = useDispatch();
  const {
    list,
    loadingList,
    errorList,
    query,
    page,
    totalPages,
  } = useSelector((state) => state.items);

  useEffect(() => {
    dispatch(fetchItems({ query, page }));
  }, [dispatch, query, page]);

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(setPage(1));
    dispatch(fetchItems({ query, page: 1 }));
  };

  return (
    <div className="items-page">
      <h2>Character Search</h2>

      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Enter name..."
          value={query}
          onChange={(e) => dispatch(setQuery(e.target.value))}
          className="search-input"
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {loadingList && <Spinner />}
      {errorList && <ErrorBox message={errorList} />}

      {!loadingList && !errorList && list.length > 0 && (
        <>
          <div className="characters-grid">
            {list.map((char) => (
              <Link
                key={char.id}
                to={`/items/${char.id}`}
                className="character-card"
              >
                <img src={char.image} alt={char.name} />
                <h3>{char.name}</h3>
                <p>{char.species}</p>
              </Link>
            ))}
          </div>

          <div className="pagination">
            <button
              disabled={page === 1}
              onClick={() => dispatch(setPage(page - 1))}
            >
              ⬅️ Prev
            </button>
            <span>
              Page {page} of {totalPages}
            </span>
            <button
              disabled={page === totalPages}
              onClick={() => dispatch(setPage(page + 1))}
            >
              Next ➡️
            </button>
          </div>
        </>
      )}

      {!loadingList && !errorList && list.length === 0 && (
        <ErrorBox message="No characters found!" />
      )}
    </div>
  );
};

export default ItemsList;