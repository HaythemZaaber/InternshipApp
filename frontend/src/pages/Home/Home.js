import admin from "../../assets/images/admins.png";
// import enseignant from "./assets/images/enseignant.svg";
import enseignant from "../../assets/images/teachers.png";
import etudiant from "../../assets/images/students.png";
import { Link } from "react-router-dom";
import "./Home.css"

const concepts = [
  {
    id:1,
    title: "Admin",
    engTitle: "admin",
    image: admin,
  },
  {
    id: 2,
    title: "Enseignant",
    engTitle: "teacher",
    image: enseignant,
  },
  {
    id: 3,
    title: "Etudiant",
    engTitle:"student",
    image: etudiant,
  },
];

function Home() {
  return (
    <div id="concepts">
      {concepts.map((role) => {
        return (
          <div key={role.id} className="concept">
            <img src={role.image} alt={role.title} />
            <h2>{role.title}</h2>
            <Link to={`${role.engTitle}/login`}>
              <button className="personbtn">Click ici</button>
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
