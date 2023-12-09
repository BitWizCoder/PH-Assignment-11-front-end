import { Button, Label, Select, TextInput, Textarea } from "flowbite-react";
import { useContext, useState } from "react";
import axios from "axios";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const NewAssignment = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [selectedValue, setSelectedValue] = useState("");
  // console.log(startDate);
  let navigate = useNavigate();

  const { user } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;

    const title = form.title.value;
    const description = form.description.value;
    const marks = form.marks.value;
    const thumbnail = form.thumbnail.value;
    const dificulty = selectedValue;
    const dueDate = startDate;

    const data = {
      title,
      description,
      marks,
      thumbnail,
      dificulty,
      dueDate,
      email: user.email,
    };

    axios.post(`/assignment`, data).then(
      // eslint-disable-next-line no-unused-vars
      (_response) => {
        toast.success("Successfully added!");
        navigate("/all-assignment");
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <div className="container mx-auto flex justify-center items-center flex-col mb-10">
      <h1 className="my-10 text-2xl font-bold text-gray-800 dark:text-white">
        Add a New Assignment
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
            onChange={handleSelectChange}
            value={selectedValue}
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

export default NewAssignment;
