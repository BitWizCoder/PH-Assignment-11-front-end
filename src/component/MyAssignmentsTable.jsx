import PropTypes from "prop-types";
import { Table } from "flowbite-react";

const MyAssignmentsTable = ({ data }) => {
  return (
    <div className="container mx-auto">
      <Table striped>
        <Table.Head>
          <Table.HeadCell>Title</Table.HeadCell>
          <Table.HeadCell>Status</Table.HeadCell>
          <Table.HeadCell>Marks</Table.HeadCell>
          <Table.HeadCell>Obtain Marks</Table.HeadCell>
          <Table.HeadCell>Feedback</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {data.map((item, key) => (
            <Table.Row
              key={key}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {item.title}
              </Table.Cell>
              <Table.Cell
                className={
                  item.status == "pending" ? "text-red-500" : "text-blue-700 "
                }
              >
                {item.status}
              </Table.Cell>
              <Table.Cell>{item.marks}</Table.Cell>
              <Table.Cell>
                {item.givenMark ? item.givenMark : "Not given"}
              </Table.Cell>
              <Table.Cell>
                {item.givenComment ? item.givenComment : "Not given"}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

MyAssignmentsTable.propTypes = {
  data: PropTypes.array,
};

export default MyAssignmentsTable;
