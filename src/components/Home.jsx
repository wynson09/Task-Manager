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

  const resetFields = () => {
    setTitle("");
    setDesc("");
    setDate("");
  };

  const handleEdit = (title, description, date) => {
    if (selectedId !== null) {
      setTitle(title);
      setDesc(description);
      setDate(date);
    }
  };

  const handleDelete = useCallback(() => {
    if (selectedId !== null) {
      const newDataList = dataTask.filter((item) => item.id !== selectedId);
      setDataTask(newDataList);
      setCount(newDataList.length);
    }
  }, [dataTask, selectedId]);

  const handleSort = () => {
    let newSortData = dataTask.map((item) => {
      return {
        ...item,
        date: new Date(item.date),
      };
    });
    console.log(newSortData);
    setDataTask(newSortData);
    setClickSort(!clickSort);
  };

  return (
    <section className="relative shadow-lg bg-[#d7eaf3] p-20 rounded-lg">
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
