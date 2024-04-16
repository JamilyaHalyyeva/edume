import React from "react";
import Table from "../Shared/Table/Table";

const transformData = (section) => {
  return section.sectionContents.map((content) => ({
    title: content.title,
    description: content.description,
    type: content.type,
    link: (
      <a href={content.url} target="_blank" rel="noopener noreferrer">
        {content.type === "video" ? "Watch Video" : "View Document"}
      </a>
    ),
  }));
};

const SectionContentList = ({ section }) => {
  const data = transformData(section);

  const columns = [
    { header: "Title", accessor: "title" },
    { header: "Description", accessor: "description" },
    { header: "Type", accessor: "type" },
    { header: "Link", accessor: "link", render: (dataItem) => dataItem.link },
  ];
  return (
    <div className="content-list mb-2">
      {section.sectionContents && section.sectionContents.length > 0 ? (
        <Table columns={columns} data={data} />
      ) : (
        <p>No content available.</p>
      )}
    </div>
  );
};

export default SectionContentList;
