import React from "react";

function Popup({
  clickAdd,
  setClickAdd,
  title,
  setTitle,
  desc,
  setDesc,
  date,
  setDate,
  clickEdit,
  setClickEdit,
  handleSubmit,
}) {
  return (
    <section
      className={
        clickAdd | clickEdit ? "popUp-container" : "popUp-container-hide"
      }
    >
      <div className="blurr"></div>
      <article className="popUp-card">
        <span
          className="close-btn"
          onClick={() => {
            setClickAdd(false);
            setClickEdit(false);
          }}
        >
          X
        </span>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="flex flex-col gap-5 mt-16 items-center"
        >
          <div className="inputbox">
            <input
              required
              type="text"
              value={title}
              maxLength={15}
              onChange={(e) => setTitle(e.target.value)}
            />
            <span>Title</span>
            <i></i>
          </div>
          <div className="inputbox">
            <input
              required
              type="text"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
            <span>Description</span>
            <i></i>
          </div>
          <div className="inputbox">
            <input
              required
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
            />
            <span className="z-10">Date</span>
            <i></i>
          </div>
          <button
            type="submit"
            className="bg-[#77b5d9] mt-10 text-[#14397d] px-[60px] py-[15px] text-xl rounded-md hover:bg-[#14397d] hover:text-[#d7eaf3] transition-all duration-300"
          >
            {clickEdit ? "Update" : "Submit"}
          </button>
        </form>
      </article>
    </section>
  );
}

export default Popup;
