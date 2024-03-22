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
    title: "Teacher",
    engTitle: "teacher",
    image: enseignant,
  },
  {
    id: 3,
    title: "Student",
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
            <h2 className="font-black">{role.title}</h2>
            <Link to={`${role.engTitle}/login`}>
              <button className="personbtn">Click here</button>
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
