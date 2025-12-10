interface CuisineFilterProps {
  cuisines: string[];
  selectedCuisine: string | null;
  onCuisineSelect: (cuisine: string | null) => void;
}

function CuisineFilter({ cuisines, selectedCuisine, onCuisineSelect }: CuisineFilterProps) {
  return (
    <div className="mb-8 flex flex-wrap justify-center gap-2">
      <button
        onClick={() => onCuisineSelect(null)}
        className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200 ${
          selectedCuisine === null
            ? "bg-gray-800 text-white shadow-md dark:bg-white dark:text-black"
            : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
        }`}
      >
        Todas
      </button>
      {cuisines.map((cuisine) => (
        <button
          key={cuisine}
          onClick={() => onCuisineSelect(cuisine)}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200 ${
            selectedCuisine === cuisine
              ? "bg-blue-600 text-white shadow-md hover:bg-blue-700"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
          }`}
        >
          {cuisine}
        </button>
      ))}
    </div>
  );
}

export default CuisineFilter;
