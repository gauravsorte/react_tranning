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
import { Routes, Route, Link, Outlet, useNavigate } from "react-router-dom";
import {userDataInitiate, userDataSuccess, userDataFailure} from '../redux/users/action' 
import { useDispatch,useSelector } from 'react-redux';




import "../CSS/projectCard.css";



const ProjectCard = (props) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const usersState = useSelector(state => state.user)
  const users = usersState.userData
  // let [users, setUsers] = useState({});
  const users__ = {}

  useEffect(() => {
    console.log('>>>>>>>>>>>>>>> use effect');
    fetchData();
  }, []);

  const fetchData = () => {
    dispatch(userDataInitiate());
    fetch("https://reqres.in/api/users")
      .then(response => response.json())
      .then((data) => {
        console.log('>>>>>>>>>>>>>>>>>>>> ',data);
        dispatch(userDataSuccess(data))
        // setUsers(data);
        // users__ = data.data
      })
  }

  const navigateToUserDetails = (userID) => {
    navigate(`/users/details/${userID}`)
  }

  return (
    <>
      {users.data ? (
        <div className="main_div">
          {users.data.map((user) => {
            return (
              <div onClick={() => navigateToUserDetails(user.id)}>
                <Card className="card__">
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
              </div>
            )


          })}
        </div>
      ) : (<div className='loader'></div>)}

    </>


  )
};

export default ProjectCard;