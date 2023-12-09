import { useParams } from "react-router-dom";
import { Button, Label, Select, TextInput, Textarea } from "flowbite-react";
import DatePicker from "react-datepicker";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const UpdateAssignment = () => {
  const { id } = useParams();
  const [startDate, setStartDate] = useState(new Date());
  const [formData, setFormData] = useState({});
  const [selectedValue, setSelectedValue] = useState(formData?.dificulty);

  const navigate = useNavigate();

  console.log(selectedValue);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/assignment/${id}`);
        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        // You can set an error state or display an error message to the user here.
      }
    };

    fetchData();
  }, [id]);

  // console.log(formData);

  const handleSubmit = (e) => {
    e.preventDefault();

    const apiUrl = `/assignment`;

    const form = e.target;

    const title = form.title.value;
    const description = form.description.value;
    const marks = form.marks.value;
    const thumbnail = form.thumbnail.value;
    const dificulty = selectedValue;
    const dueDate = startDate;

    const updatedData = {
      title,
      description,
      marks,
      thumbnail,
      dificulty,
      dueDate,
    };

    axios
      .put(`${apiUrl}/${id}`, updatedData) // Replace 'id' with the assignment ID you want to update
      // eslint-disable-next-line no-unused-vars
      .then((_response) => {
        // Handle a successful response
        toast.success("Assignment updated successfully");
        navigate("/all-assignment");
        // console.log("Assignment updated successfully:", response.data);
      })
      .catch((error) => {
        // Handle errors
        toast.error("Error updating assignment");
        console.error("Error updating assignment:", error);
      });
  };

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <div className="container mx-auto flex justify-center items-center flex-col mb-10">
      <h1 className="my-10 text-2xl font-bold text-gray-800 dark:text-white">
        Update Assignment
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex w-[30%] justify-center flex-col gap-4"
      >
        {/* Tittle */}
        <div>
          <div className="mb-2 block">
            <Label value="Title" />
          </div>
          <TextInput
            defaultValue={formData.title}
            name="title"
            type="text"
            placeholder="Add title"
            required
          />
        </div>
        {/* Description */}
        <div>
          <div className="mb-2 block">
            <Label value="Description" />
          </div>
          <Textarea
            defaultValue={formData.description}
            name="description"
            className="p-2"
            placeholder="Add Description..."
            required
            rows={4}
          />
        </div>
        {/* Marks */}
        <div>
          <div className="mb-2 block">
            <Label value="Marks" />
          </div>
          <TextInput
            defaultValue={formData.marks}
            name="marks"
            type="number"
            placeholder="Add Marks"
            required
          />
        </div>
        {/* Thumbnail url */}
        <div>
          <div className="mb-2 block">
            <Label value="Thumbnail" />
          </div>
          <TextInput
            defaultValue={formData.thumbnail}
            name="thumbnail"
            type="url"
            placeholder="Add tumbnail url"
            required
          />
        </div>
        {/* Dificulty Level */}
        <div>
          <div className="mb-2 block">
            <Label htmlFor="countries" value="Dificulty Level" />
          </div>
          <Select
            id="countries"
            required
            defaultValue={selectedValue}
            onChange={handleSelectChange}
            // value={selectedValue}
          >
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </Select>
        </div>

        {/* Due Date */}
        <div>
          <div className="mb-2 block">
            <Label htmlFor="countries" value="Due Date" />
          </div>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          />
        </div>

        {/* Submint button */}
        <div>
          <Button className="w-full" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UpdateAssignment;
