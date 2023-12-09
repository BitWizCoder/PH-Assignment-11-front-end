import AssignmentCard from "../component/AssignmentCard";
import { Pagination, Select } from "flowbite-react";
import { useEffect, useState } from "react";
import axios from "axios";

const AllAssignments = () => {
  const [queryData, setQueryData] = useState("Easy");
  const [data, setData] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  console.log(data);
  
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(
          `/assignments/${queryData}?page=${currentPage}`
        );
        setData(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    getData();
  }, [queryData, currentPage]);

  const handleChange = (e) => {
    setQueryData(e.target.value);
  };

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    console.log(currentPage);
  }, [currentPage]);

  return (
    <>
      <div className="flex items-center px-10">
        <Select value={queryData} onChange={handleChange}>
          {/* <option defaultValue={""}>Filter Difficulty</option> */}
          <option defaultValue={"Easy"}>Easy</option>
          <option defaultValue={"Medium"}>Medium</option>
          <option defaultValue={"Hard"}>Hard</option>
        </Select>
      </div>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {data &&
          data?.map((data) => <AssignmentCard key={data._id} data={data} />)}
      </div>
      <div className="flex overflow-x-auto sm:justify-center">
        <Pagination
          currentPage={currentPage}
          totalPages={100}
          onPageChange={onPageChange}
        />
      </div>
    </>
  );
};

export default AllAssignments;
