import axios from "axios";
import { Button, Label, Table, TextInput, Textarea } from "flowbite-react";
import PropTypes from "prop-types";
import { useState } from "react";
import toast from "react-hot-toast";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";

const SubmittedAssignmentsTable = ({ data }) => {
  const [openModal, setOpenModal] = useState(false);

  const [modalData, setModalData] = useState({});

  function onCloseModal() {
    setOpenModal(false);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;

    const givenMark = form.givenMark.value;
    const givenComment = form.givenComment.value;

    const apiUrl = `/submitted-assignment`;
    const updatedData = {
      givenMark,
      givenComment,
      status: "Completed",
    };

    axios
      .put(`${apiUrl}/${modalData._id}`, updatedData) // Replace 'id' with the assignment ID you want to update
      .then((response) => {
        // Handle a successful response
        console.log("Assignment updated successfully:", response.data);
      })
      .catch((error) => {
        // Handle errors
        console.error("Error updating assignment:", error);
      });

    setOpenModal(false);

    toast.success(`Mark added Successfully`);

    console.log(givenMark, givenComment);
  };

  return (
    <div className="container mx-auto">
      <Table striped>
        <Table.Head>
          <Table.HeadCell>Assignment</Table.HeadCell>
          <Table.HeadCell>Examinee</Table.HeadCell>
          <Table.HeadCell>Status</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Give Mark</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {/* <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
            <div
              style={{
                border: "1px solid rgba(0, 0, 0, 0.3)",
                height: "750px",
              }}
            >
              <Viewer fileUrl="assignment-4 requirements.pdf" />
            </div>
          </Worker> */}

          {data.map((item, key) => (
            <Table.Row
              key={key}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {item.title}
              </Table.Cell>
              <Table.Cell>
                <span className="font-bold">{item.userName}</span> <br />
                {item.userEmail}
              </Table.Cell>
              <Table.Cell
                className={
                  item.status == "pending" ? "text-red-400" : "text-gray-900 "
                }
              >
                {item.status}
              </Table.Cell>
              <Table.Cell>
                <Button
                  // href="#"
                  color="dark"
                  onClick={() => {
                    setOpenModal(true);
                    setModalData(item);
                  }}
                >
                  Give Mark
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      {/* Modal */}
      <div
        className={`w-full bg-gray-800 bg-opacity-80 absolute inset-0 mx-auto ${
          openModal ? "block" : "hidden"
        }`}
        // show={openModal}
        // ={onCloseModal}
      >
        <form onSubmit={handleSubmit} className="relative p-10">
          <button onClick={onCloseModal} className="absolute bg-red-500 text-white font-bold text-2xl px-2 rounded-full right-0 mr-5">X</button>
          <div>
            <div className="">
              <h3 className="text-center text-xl font-medium text-gray-900 dark:text-white">
                Assignemnt Details
              </h3>

              <div className="grid">
                <div>
                  <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                    <div
                      style={{
                        border: "1px solid rgba(0, 0, 0, 0.3)",
                        height: "1200px",
                        width: "900px",
                        margin: "auto",
                      }}
                    >
                      <Viewer fileUrl="assignment-4 requirements.pdf" />
                    </div>
                  </Worker>
                </div>
                <div className="px-10 py-5">
                  <div className="mb-2 block">
                    <Label value="EXAMINEE Note" />
                  </div>
                  <Textarea
                    name="comment"
                    className="p-2"
                    id="comment"
                    placeholder="Leave a Note..."
                    required
                    rows={4}
                    value={modalData.comment}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-6 px-10">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                Mark the assignment
              </h3>
              <div>
                <div className="mb-2 block">
                  <Label value="Mark" />
                </div>
                <TextInput
                  name="givenMark"
                  type="number"
                  placeholder="number"
                  required
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label value="Your Note" />
                </div>
                <Textarea
                  name="givenComment"
                  className="p-2"
                  id="comment"
                  placeholder="Leave a Note..."
                  required
                  rows={4}
                />
              </div>
              <div className="w-full">
                <Button type="submit">Submit</Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

SubmittedAssignmentsTable.propTypes = {
  data: PropTypes.array,
};

export default SubmittedAssignmentsTable;
