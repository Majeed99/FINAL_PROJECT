// import { useNavigate } from "react-router-dom";
// import "../styles/RequestCard-style.css";
// import { FaCheck } from "react-icons/fa";
// import { RiCloseFill } from "react-icons/ri";

// function RequestCard(props) {
//   const e = props.user;
//   const navigate = useNavigate();

//   function reject(id) {
    
//   }

//   return (
//     <div>
//       <div className="friend__Card">
//         <div
//           className="display-flex"
//           onClick={() => {
//             navigate("/user/" + e._id);
//           }}
//         >
//           <img src={e.avatar} alt="" />
//           <div className="user__names__req">
//             <b>{e.name}</b>
//             <p>@{e.userName}</p>
//           </div>
//         </div>
//         <div className="control_req_btns">
//           <button className="accept_btn">
//             {" "}
//             <FaCheck fill="white" />
//           </button>
//           <button
//             className="reject_btn"
//             onClick={(element) => {
//               element.preventDefault();
//               reject(e._id);
//             }}
//           >
//             {" "}
//             <RiCloseFill fill="white" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default RequestCard;
