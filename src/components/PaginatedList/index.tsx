import React from "react";
import { Pagination } from "antd";
import { Card, ListGroup } from "react-bootstrap";
import { Virtuoso } from "react-virtuoso";

type PaginatedVirtualizedListProps<T> = {
  data: T[];
  RenderComponent: React.FC<{ item: T }>;
  itemsPerPage?: number;
  height?: number;
  pagination?: {
    current: number;
    pageSize: number;
    total: number;
  };
  handlePageChange?: (page: number) => void;
};

const PaginatedVirtualizedList = <T,>({
  data,
  RenderComponent,
  itemsPerPage = 100,
  height = 400,
  pagination,
  handlePageChange,
}: PaginatedVirtualizedListProps<T>) => {
  return (
    <div>
      <Card style={{ padding: "5px", display: "flex", alignItems: "flex-end" }}>
        <Pagination
          current={pagination?.current}
          total={pagination?.pageSize}
          pageSize={pagination?.total}
          // pagination={{
          //   ...pagination,
          //   onChange: (page, size) => {
          //     handlePageChange(page);
          //   },
          // }}

          onChange={(page) => {
            if (handlePageChange) handlePageChange(page);
          }}
          style={{ marginTop: 10, textAlign: "center" }}
        />
      </Card>
      {/* Virtualized List */}
      <ListGroup>
        <Virtuoso
          style={{ height }}
          totalCount={data.length}
          itemContent={(index) => <RenderComponent item={data[index]} />}
        />
      </ListGroup>

      {/* Pagination Controls */}
    </div>
  );
};

export default PaginatedVirtualizedList;
