import { useState } from 'react';
import { SortingOption } from '../../const';

type SortingProps = {
  onSorting: (sortingOption: string) => void;
}

export default function Sorting({ onSorting }: SortingProps): JSX .Element {
  const [isOpened, setIsOpened] = useState(false);
  const [activeOption, setActiveOption] = useState<string>(SortingOption.Popular);

  const handleListVisibility = () => {
    setIsOpened(!isOpened);
  };

  const updateSorting = (option: string) => {
    setActiveOption(option);
    onSorting(option);
    handleListVisibility();
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0} onClick={handleListVisibility}>
        {activeOption}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul
        className={`places__options places__options--custom ${isOpened && 'places__options--opened'}`}
      >
        {Object.values(SortingOption).map((option: string) =>
          (
            <li
              tabIndex={0}
              key={option}
              className={`places__option ${option === activeOption && 'places__option--active'}`}
              onClick={() => updateSorting(option)}
            >
              {option}
            </li>
          )
        )}
      </ul>
    </form>
  );
}
