import React from "react";
import {
  Box,
  Text,
  Button,
  HStack,
} from "@chakra-ui/react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <Box as="nav">
      <HStack spacing={2} className="pagination">
        {pageNumbers.map((pageNumber) => (
          <Button
            key={pageNumber}
            size="sm"
            colorScheme={pageNumber === currentPage ? "teal" : "gray"}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </Button>
        ))}
      </HStack>
    </Box>
  );
};

export default Pagination;
