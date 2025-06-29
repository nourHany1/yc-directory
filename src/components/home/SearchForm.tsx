import { Search } from "lucide-react";

import From from "next/form";

import SearchFormReset from "@/components/home/SearchFormReset";

function SearchForm({ query }: { query?: string }) {
  console.log("query", query);
  return (
    <From action="/" className="search-form">
      <input
        defaultValue={query}
        name="query"
        placeholder="Search Startups"
        className="search-input"
      />

      <div className="flex gap-2">
        {query && <SearchFormReset />}

        <button type="submit" className="search-btn text-white cursor-pointer">
          <Search className="size-5 " />
        </button>
      </div>
    </From>
  );
}

export default SearchForm;
