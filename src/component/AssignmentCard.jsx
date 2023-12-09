import { Button, Card } from "flowbite-react";
import axios from "axios";
import { useMutation } from "react-query";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const AssignmentCard = ({ data }) => {
  const { _id, title, description, marks, thumbnail, dificulty, dueDate } =
    data;

  const { user } = useContext(AuthContext);

  // const itemId = _id;
  //   const apiUrl = `/assignment/${itemId}`;

  const deleteAssignment = (id) => {
    if (user?.email === data.email) {
      axios
        .delete(`/assignment/${id}`)
        .then((response) => {
          if (response.status === 200) {
            toast.success(`Successfully deleted ${title}!`);
            // console.log(`Item with ID ${itemId} has been deleted successfully.`);
            handleDelete(id);
          } else {
            toast.error(`Failed delete ${title}!`);
            // console.log(`Failed to delete the item with ID ${itemId}.`);
          }
        })
        .catch((error) => {
          console.error(`An error occurred while deleting the item: ${error}`);
        });
    } else {
      toast.error("User not authorized");
    }
  };

  const deleteAssignmentMutation = useMutation(deleteAssignment, {
    onMutate: (id) => {
      // Optimistically remove the item from the UI to provide a smoother experience
      return { id };
    },
    onError: (error) => {
      // Handle errors if the mutation fails
      console.error("Deletion error:", error);
    },
    onSettled: () => {
      // This can be used for any cleanup or post-mutation actions
    },
  });

  const handleDelete = (id) => {
    deleteAssignmentMutation.mutate(id);
  };

  if (deleteAssignmentMutation.isSuccess) {
    // The item has been deleted, you can return null or handle it as needed
    return null;
  }

  return (
    <div>
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
          <Link to={`/assignment-details/${_id}`}>
            <Button color="dark">Details</Button>
          </Link>

          <Link to={`/update-assignment/${_id}`}>
            <Button color="dark">Update</Button>
          </Link>

          <Button
            color="dark"
            onClick={() => {
              deleteAssignment(_id);
            }}
          >
            Delete
          </Button>
        </div>
      </Card>
    </div>
  );
};

AssignmentCard.propTypes = {
  data: PropTypes.object,
};

export default AssignmentCard;
