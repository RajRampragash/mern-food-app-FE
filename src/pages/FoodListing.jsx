import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import ProductsCard from "../components/card/ProductsCard";
import { filter } from "../utils/data/Data";
import { Slider } from "@mui/material";
import { getAllproducts } from "../api";

const Container = styled.div`
   padding: 20px 30px;
  padding-bottom: 200px;
  height: 100%;
  overflow-y: scroll;
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 30px;
  @media (max-width: 700px) {
    flex-direction: column;
    padding: 20px 12px;
  }
  background: ${({ theme }) => theme.bg};
`;

const Filters = styled.div`
padding: 20px 16px;
  flex: 1;
  width: 100%;
  max-width: 300px;
  height: 100vh; /* Set a fixed height */
  position: sticky; /* Make it sticky */
  top: 0; /* Stick to the top */
  overflow-y: auto; /* Allow scrolling if content overflows */
  @media (max-width: 700px) {
    max-width: 440px;
    height: auto; /* Allow auto height on smaller screens */
  }
`;

const Menu = styled.div`
   display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Products = styled.div`
   flex: 1;
  padding: 20px 0px;
`;

const CardWrapper = styled.div`
    display: flex;
  flex-wrap: wrap;
  gap: 32px;
  justify-content: center;
  @media (max-width: 760px) {
    gap: 16px;
  }
`;

const FilterSection = styled.div`
display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 12px;
  border: 1px solid ${({ theme }) => theme.text_secondary + 50}; /* Optional: Add a border */
  border-radius: 8px; /* Optional: Add rounded corners */
  background: ${({ theme }) => theme.bg}; /* Optional: Background color */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Title = styled.div`
   font-size: 20px;
  font-weight: 500;
`;

const Item = styled.div`
   display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const Selectableitem = styled.div`
    cursor: pointer;
  display: flex;
  border: 1px solid ${({ theme }) => theme.text_secondary + 50};
  color: ${({ theme }) => theme.text_secondary + 90};
  border-radius: 8px;
  padding: 2px 8px;
  font-size: 16px;
  width: fit-content;
  ${({ selected, theme }) =>
    selected &&
    `
  border: 1px solid ${theme.text_primary};
  color: ${theme.text_primary};
  background: ${theme.text_primary + 30};
  font-weight: 500;
  `}
`;

const FoodListing = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const getFilteredProductsData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getAllproducts(
        selectedCategories.length > 0
          ? `minPrice=${priceRange[0]}&maxPrice=${priceRange[1]}&categories=${selectedCategories.join(",")}`
          : `minPrice=${priceRange[0]}&maxPrice=${priceRange[1]}`
      );
      setProducts(res.data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  }, [priceRange, selectedCategories]);

  useEffect(() => {
    getFilteredProductsData();
  }, [getFilteredProductsData]);

  const handleSliderChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handleCategoryChange = useCallback(
    (category) => {
      setSelectedCategories((prev) =>
        prev.includes(category)
          ? prev.filter((cat) => cat !== category)
          : [...prev, category]
      );
    },
    []
  );

  return (
    <Container>
      <Filters>
        <Menu>
          {filter.map((filters) => (
            <FilterSection key={filters.name}>
              <Title>{filters.name}</Title>
              {filters.value === "price" ? (
                <Slider
                  aria-label="Price"
                  min={0}
                  max={1000}
                  valueLabelDisplay="auto"
                  marks={[
                    { value: 0, label: "$0" },
                    { value: 1000, label: "$1000" },
                  ]}
                  value={priceRange}
                  onChange={handleSliderChange}
                />
              ) : filters.value === "category" ? (
                <Item>
                  {filters.items.map((item) => (
                    <Selectableitem
                      key={item}
                      selected={selectedCategories.includes(item)}
                      onClick={() => handleCategoryChange(item)}
                    >
                      {item}
                    </Selectableitem>
                  ))}
                </Item>
              ) : null}
            </FilterSection>
          ))}
        </Menu>
      </Filters>
      <Products>
        {loading ? (
          <div>Loading...</div>
        ) : products.length > 0 ? (
          <CardWrapper>
            {products.map((product) => (
              <ProductsCard key={product.id} product={product} />
            ))}
          </CardWrapper>
        ) : (
          <div>No products found for the selected filters.</div>
        )}
      </Products>
    </Container>
  );
};

export default FoodListing;
