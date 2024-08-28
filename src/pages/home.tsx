import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { Button } from "../components/ui/button";
import { Product } from "@/types/product";
import { Can } from "@/components/Can";
import { useGetProducts } from "@/features/useProduct";
import { useDebounce } from "@/hooks/useDebounce";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectValue
} from "@/components/ui/select";
import ProductCard from "@/components/product/ProductCard";
import Modal from "@/components/Modal";
import DisplayCart from "@/components/product/DisplayCart";

// TODO: seperate into proper components
const Home = () => {
  const { register, watch, control, setValue } = useForm<{
    search: string;
    sortBy: string;
  }>();

  const [open, setOpen] = useState(false);

  const debouncedSearchTerm = useDebounce(watch("search"), 1000);
  const sortOptions = [
    { label: "Price: High to Low", value: "ph" },
    { label: "Price: Low to High ", value: "pl" },
    { label: "Names Ascending", value: "asc" },
    { label: "Names Descending", value: "dsc" },
    { label: "Top rated", value: "tr" }
  ];
  const userId = "b7838adc-b8d8-4a29-917b-afd20e2c5066";

  useEffect(() => {
    const token =
      "eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE3MjQ3NzQ5NzgsImV4cCI6MTcyNDg2MTM3OH0.KzR4E0hl1g_TknsXqWOOJu-ZmvxjRSNxAxhbwWPKpiH_VqhtKAd4753GX8gWfMmd";
    localStorage.setItem("authToken", token);
  }, []);

  const {
    data: products,
    isFetching,
    isError
  } = useGetProducts(debouncedSearchTerm, watch("sortBy"));

  const toggleModal = () => setOpen(!open);

  return (
    <div className="flex flex-col justify-center items-center flex-wrap">
      <h1 className="text-2xl my-2">Welcome!</h1>
      <Button style={{ minWidth: "asd" }} onClick={toggleModal}>
        Cart
      </Button>
      {/* //TODO: move modal inside the component */}
      <Modal style={{ minWidth: "400px" }} open={open} toggleModal={toggleModal} modalTitle="Cart">
        <DisplayCart userId={userId} />
      </Modal>

      <div className="flex gap-5 my-3">
        <Input
          type="search"
          disabled={isFetching}
          {...register("search")}
          placeholder="Search products.."
        />
        <Controller
          name="sortBy"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Select
              disabled={isFetching}
              value={field.value}
              onValueChange={(value) => {
                field.onChange(value);
                setValue("sortBy", value);
              }}
            >
              <SelectTrigger className="w-[250px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        />
      </div>

      {isFetching ? (
        <div className="bg-cyan-400	">Loading...</div>
      ) : isError ? (
        <div>Error fetching products</div>
      ) : (
        <Can
          permission="PRODUCT:GET"
          permissionType="actions"
          yes={() => (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 my-2">
              {products.map((product: Product) => (
                <ProductCard key={product.id} product={product} userId={userId} />
              ))}
            </div>
          )}
        />
      )}
    </div>
  );
};

export default Home;
