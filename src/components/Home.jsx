import React, { useState, useMemo, useCallback } from "react";
import Pagination from "./Pagination";
import data from "../data/mock-data.json";
import { BiSort } from "react-icons/bi";
import Popup from "./Popup";

let pageSize = 10;
const Home = () => {
  const [dataTask, setDataTask] = useState(data);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedId, setSelectedId] = useState(null);
  const [clickEdit, setClickEdit] = useState(false);
  const [clickAdd, setClickAdd] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState("");
  const [count, setCount] = useState(data.length);
  const [clickSort, setClickSort] = useState(false);

  /* I used useMemo to hold the data per page */
  const currentTableData = useMemo(() => {
    if (clickSort) {
      const firstPageIndex = (currentPage - 1) * pageSize;
      const lastPageIndex = firstPageIndex + pageSize;
      return dataTask.slice(firstPageIndex, lastPageIndex);
    } else {
      const firstPageIndex = (currentPage - 1) * pageSize;
      const lastPageIndex = firstPageIndex + pageSize;
      return dataTask.slice(firstPageIndex, lastPageIndex);
    }
  }, [currentPage, dataTask, clickSort]);

  /* 
        This function will handle add data to the current data from JSON .
        And also will handle the update funtionality .
  */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (clickEdit) {
      for (let i = 0; i < dataTask.length; i++) {
        if (dataTask[i].id === selectedId) {
          dataTask[i].title = title;
          dataTask[i].description = desc;
          dataTask[i].date = date;
        }
      }
      resetFields();
      setDataTask(dataTask);
      setClickEdit(false);
      setSelectedId(null);
      return;
    }
    if (clickAdd) {
      dataTask.reverse();
      const newData = {
        id: dataTask.length + 1,
        title,
        description: desc,
        date,
      };
      const newListData = [...dataTask, newData];
      newListData.reverse();
      setDataTask(newListData);
      setCount(dataTask.length + 1);
      resetFields();
      setClickAdd(false);
    }
  };

  /* 
        This function will reset all the input fields.
   */
  const resetFields = () => {
    setTitle("");
    setDesc("");
    setDate("");
  };

  /* 
        This handleEdit function will hold the value of title, description and date that being use to update the current data from JSON DB.
   */
  const handleEdit = (title, description, date) => {
    if (selectedId !== null) {
      setTitle(title);
      setDesc(description);
      setDate(date);
    }
  };

  /* 
        This delete function will filter the selected row id and remove it from the list of data.
  */
  const handleDelete = useCallback(() => {
    if (selectedId !== null) {
      const newDataList = dataTask.filter((item) => item.id !== selectedId);
      setDataTask(newDataList);
      setCount(newDataList.length);
    }
  }, [dataTask, selectedId]);

  /* 
        This will sort the data by dates.
   */
  const handleSort = () => {
    if (clickSort) {
      dataTask.sort((a, b) => {
        return new Date(a.date) - new Date(b.date); // descending
      });
    } else {
      dataTask.sort((a, b) => {
        return new Date(b.date) - new Date(a.date); // ascending
      });
    }
    setDataTask(dataTask);
    setClickSort(!clickSort);
  };

  return (
    <section className="relative shadow-lg bg-[#d7eaf3] p-20 rounded-lg">
      {/* 
            A popup components that will be shown if the user will adding or updating data from the JSON DB.
            Send specific probs that are needed to the popup component
        */}
      <Popup
        clickAdd={clickAdd}
        setClickAdd={setClickAdd}
        title={title}
        setTitle={setTitle}
        desc={desc}
        setDesc={setDesc}
        date={date}
        setDate={setDate}
        clickEdit={clickEdit}
        setClickEdit={setClickEdit}
        handleSubmit={handleSubmit}
      />
      <div className="flex justify-between items-end py-4">
        <h1 className="text-[50px] font-semibold text-[#14397d]">
          Task Manager
        </h1>
        <button
          className="bg-[#77b5d9] text-[#14397d] px-[15px] py-[10px] rounded-md hover:bg-[#14397d] hover:text-[#d7eaf3] transition-all duration-300"
          onClick={() => {
            setClickAdd(true);
            resetFields();
          }}
        >
          Add Task
        </button>
      </div>

      {/* 
            I set up a table to map all data from the data from JSON DB
       */}
      <table className="border-solid border-3 min-w-[60em] text-center">
        <thead>
          <tr className="bg-[#14397d] text-[#d7eaf3]">
            <th className="py-4 text-2xl font-normal">Title</th>
            <th className="py-4 text-2xl font-normal">Description</th>
            <th
              className="py-4 text-2xl font-normal relative cursor-pointer"
              onClick={handleSort}
            >
              Due Date <BiSort className="absolute top-[22px] right-1" />
            </th>
          </tr>
        </thead>
        <tbody>
          {/* 
                    It will map the data and have a dynamic display
            */}
          {currentTableData.map((item) => {
            const newDate = new Date(item?.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            });
            return (
              <tr
                className="cursor-pointer"
                style={{
                  background: selectedId === item.id ? "#77b5d9" : "",
                }}
                onClick={() => {
                  setSelectedId(item.id);
                  handleEdit(item.title, item.description, item.date);
                }}
                key={item.id}
              >
                <td className="py-2">{item.title}</td>
                <td>{item.description}</td>
                <td>{newDate}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* 
            Send specific probs that are needed to the Pagination component
      */}
      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={count}
        pageSize={pageSize}
        setClickEdit={setClickEdit}
        handleDelete={handleDelete}
        selectedId={selectedId}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </section>
  );
};

export default Home;
