import "./Table.css";

const Table = ({ columns, data }) => {
  return (
    <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {columns &&
              columns.length > 0 &&
              columns.map((column) => (
                <th key={column.accessor} scope="col" className="py-3 px-6">
                  {column.header}
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((row, rowIndex) => (
              <tr
                key={row._id || rowIndex}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                {columns.map((column) => (
                  <td key={column.accessor} className="py-4 px-6">
                    {(() => row[column.accessor])()}
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
