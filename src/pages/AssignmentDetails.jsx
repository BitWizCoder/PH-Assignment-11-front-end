import axios from "axios";
import {
  Button,
  Card,
  Label,
  Modal,
  TextInput,
  Textarea,
} from "flowbite-react";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const AssignmentDetails = () => {
  const [cardData, setCardData] = useState({});
  const { id } = useParams();

  const { user } = useContext(AuthContext);
  console.log(user);

  const [openModal, setOpenModal] = useState(false);

  function onCloseModal() {
    setOpenModal(false);
  }

  const { title, description, marks, thumbnail, dificulty, dueDate } = cardData;

  useEffect(() => {
    axios
      .get(`/assignment/${id}`)
      .then((res) => setCardData(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const pdf = form.pdfLink.value;
    const comment = form.comment.value;

    const formData = {
      title,
      marks,
      pdf,
      comment,
      userEmail: user.email,
      userName: user.displayName,
      status: "pending",
    };

    axios
      .post(`/submit-assignment`, formData)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));

    console.log("form submited.", pdf, comment);
  };

  return (
    <div className="flex justify-center mt-10">
      <Card
        className="max-w-sm"
        imgAlt="Meaningful alt text for an image that is not purely decorative"
        imgSrc={thumbnail}
      >
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          {description}
        </p>

        <div className="flex gap-5">
          <p className="font-normal text-gray-700 dark:text-gray-400">
            <span className="font-bold">Marks:</span> {marks}
          </p>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            <span className="font-bold">Dificulty:</span> {dificulty}
          </p>
        </div>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          <span className="font-bold">Due Date:</span> {dueDate}
        </p>

        <div className="flex justify-between">
          <Button onClick={() => setOpenModal(true)} color="dark">
            Take Assignemnt
          </Button>
        </div>
      </Card>

      {/* Modal */}
      {/* <Button onClick={() => setOpenModal(true)}>Toggle modal</Button> */}
      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <form onSubmit={handleSubmit}>
          <Modal.Header />
          <Modal.Body>
            <div className="space-y-6">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                Take the Assignemnt
              </h3>
              <div>
                <div className="mb-2 block">
                  <Label value="PDF Link" />
                </div>
                <TextInput
                  name="pdfLink"
                  id="url"
                  placeholder="please enter a pdf link"
                  required
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label value="Your Note" />
                </div>
                <Textarea
                  name="comment"
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
          </Modal.Body>
        </form>
      </Modal>
    </div>
  );
};

export default AssignmentDetails;
