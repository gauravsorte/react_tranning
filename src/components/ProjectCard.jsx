import { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Button,
  CardImg,
} from "reactstrap";

import "../CSS/projectCard.css";



const ProjectCard = (props) => {

  let [users, setUsers] = useState({});
  const users__ = {}

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch("https://reqres.in/api/users")
      .then(response => response.json())
      .then((data) => {
        console.log(data.data);
        setUsers(data);
        // users__ = data.data
      })
  }

  return (
    <>
      {users.data ? (
        <div className="main_div">
          {users.data.map((user) => {
          return  <Card className="card__">
              <CardImg
                alt={user.first_name}
                src={user.avatar}
                className="card_image"
              />
              <CardBody className="card_body">
                <CardTitle tag="h5" className="card_title">
                  {user.first_name} {user.last_name}
                </CardTitle>
                <CardText className="card_email">
                  {user.email}
                </CardText>

              </CardBody>
            </Card>
          })}
        </div>
      ) : (<h1>LOADING..</h1>)}

    </>


  )
};

export default ProjectCard;