import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from "../../context/auth.context";
import Navbar from '../../components/Navbar/Navbar';
import "./SubmitWeek.css"
function SubmitWeek() {
  const { user, family, setUser } = useContext(AuthContext);
  const [familyMember, setFamilyMember] = useState([]);
  const [tasksByFamily, setTasksByFamily] = useState(0);
  const [tasksDoneByFamily, setTasksDoneByFamily] = useState(0);
  const [tasksPendingByFamily, setTasksPendingByFamily] = useState(0);
  const [tasksDoneByUser, setTasksDoneByUser] = useState(0);
  const [tasksPendingByUser, setTasksPendingByUser] = useState(0);
  const [kpiByFamily, setkpiByFamily] = useState(0);
  const [kpiByUser, setkpiByUser] = useState(0);

  const [taskAssignedTo, setTaskAssignedTo] = useState("");
  const handleTaskAssignedTo = (e) => setTaskAssignedTo(e.target.value);

  const CalculateKpiFamily = async () => {
    try {
      if (tasksDoneByFamily || tasksByFamily) {
        const kpiFamily = (tasksDoneByFamily / tasksByFamily) * 100;
        const roundedKpiFamily = kpiFamily.toFixed(2);
        setkpiByFamily(roundedKpiFamily)
      } else {
        setkpiByFamily("loading")
      }
    }
    catch (error) {
      console.error(error);
    }
  }
  const getTasksbyFamily = async () => {
    try {
      const familyTasksResponse = await fetch(`${import.meta.env.VITE_SERVER_URL}/family/tasks/${family._id}/tasksByFamily`);
      const familyTasksResponseJson = await familyTasksResponse.json()
      setTasksByFamily(familyTasksResponseJson.tasksByFamily)
      setTasksDoneByFamily(familyTasksResponseJson.tasksDoneByFamily)
      setTasksPendingByFamily(familyTasksResponseJson.tasksPendingByFamily)

    } catch (error) {
      console.error(error);
    }
  }


  useEffect(() => {
    getTasksbyFamily();
  }, []);

  useEffect(() => {
    CalculateKpiFamily();

  }, [tasksDoneByFamily, tasksByFamily]);

  return (
    <>
      <Navbar />
      <div className='form-createtask-container'>
        <h2 className='text-h2'>Weekly Score</h2>
        <div className="performance">
          <p className="text-p"> <i class="fa-solid fa-chart-simple icon"></i> {family.familyName} family performance : </p>
          <p className="text-p"> <i class="fa-solid fa-clipboard icon"></i> {tasksByFamily} Tasks weekly</p>
          <p className="text-p"> <i class="fa-solid fa-check icon"></i> {tasksDoneByFamily} tasks done</p>
          <p className="text-p"> <i class="fa-solid fa-hourglass icon"></i> {tasksPendingByFamily} tasks pending</p>
          <p className="text-p"> <i class="fa-solid fa-gauge icon"></i> Family KPI: {kpiByFamily} %</p>
        </div>
        <div className="performance">
          <img className="img" src={user.userPicture} alt={user.name} />
          <p className="text-p"> <i class="fa-solid fa-chart-simple icon"></i> {user.name}, your personal score: </p>
          <p className="text-p"> <i class="fa-solid fa-check icon"></i> {tasksDoneByUser} tasks done</p>
          <p className="text-p"> <i class="fa-solid fa-hourglass icon"></i> {tasksPendingByUser} tasks pending</p>
          <p className="text-p"> <i class="fa-solid fa-gauge icon"></i>  User KPI: {kpiByUser} %</p>
        </div>
      </div>
    </>
  );
}

export default SubmitWeek;

