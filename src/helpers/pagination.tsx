import React from "react";
import { Box, Text, Button, HStack } from "@chakra-ui/react";

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
        {currentPage > 1 && (
          <Button
            size="sm"
            colorScheme="teal"
            onClick={() => onPageChange(currentPage - 1)}
          >
            Previous
          </Button>
        )}
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
        {currentPage < totalPages && (
          <Button
            size="sm"
            colorScheme="teal"
            onClick={() => onPageChange(currentPage + 1)}
          >
            Next
          </Button>
        )}
      </HStack>
    </Box>
  );
};

export default Pagination;
