import axios from "axios";
import SubmittedAssignmentsTable from "../component/SubmittedAssignmentsTable";
import { useEffect, useState } from "react";

const SubmitedAssignments = () => {
  const [submitedAssinments, setSubmitedAssinments] = useState([]);
  useEffect(() => {
    axios
      .get(`/submitted-assignments/pending`)
      .then((res) => setSubmitedAssinments(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="mt-8">
      {/* {submitedAssinments.map((assinment) => (
        ))} */}
      <SubmittedAssignmentsTable data={submitedAssinments} />
    </div>
  );
};

export default SubmitedAssignments;
