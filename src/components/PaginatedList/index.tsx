import React, { useMemo, useState } from "react";
import { Pagination } from "antd";
import { Card, ListGroup } from "react-bootstrap";
import { Virtuoso } from "react-virtuoso";

type PaginatedVirtualizedListProps<T> = {
  data: T[];
  RenderComponent: React.FC<{ item: T }>;
  itemsPerPage?: number;
  height?: number;
};

const PaginatedVirtualizedList = <T,>({
  data,
  RenderComponent,
  itemsPerPage = 10,
  height = 400,
}: PaginatedVirtualizedListProps<T>) => {
  console.log(data);

  const [currentPage, setCurrentPage] = useState(1);

  // Compute the data for the current page
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return data.slice(startIndex, startIndex + itemsPerPage);
  }, [currentPage, data, itemsPerPage]);

  return (
    <div>
      <Card style={{ padding: "5px", display: "flex", alignItems: "flex-end" }}>
        <Pagination
          current={currentPage}
          total={data.length}
          pageSize={itemsPerPage}
          onChange={setCurrentPage}
          style={{ marginTop: 10, textAlign: "center" }}
        />
      </Card>
      {/* Virtualized List */}
      <ListGroup>
        <Virtuoso
          style={{ height }}
          totalCount={paginatedData.length}
          itemContent={(index) => (
            <RenderComponent item={paginatedData[index]} />
          )}
        />
      </ListGroup>

      {/* Pagination Controls */}
    </div>
  );
};

export default PaginatedVirtualizedList;
