import { useContext, useEffect, useState } from "react";
import MyAssignmentsTable from "../component/MyAssignmentsTable";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const MyAssignments = () => {
  const [submitedAssinments, setSubmitedAssinments] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get(`/my-assignments/${user?.email}`)
      .then((res) => setSubmitedAssinments(res.data))
      .catch((err) => console.log(err));
  }, [user?.email]);

  return (
    <div>
      <MyAssignmentsTable data={submitedAssinments} />
    </div>
  );
};

export default MyAssignments;
