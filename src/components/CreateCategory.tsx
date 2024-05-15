import styled from "styled-components";
import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";
import {
  selectedCategoryState,
  AddListModalState,
  categoriesState,
  toDoState,
} from "../atoms";
import { useForm } from "react-hook-form";

const Container = styled.div`
  display: grid;
  gap: 15px;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  margin-top: 50px;
`;
const Menu = styled.select`
  text-align-last: center;
  text-align: center;
  width: 400px;
  margin-right: 4px;
  cursor: pointer;
`;

const Input = styled.input`
  width: 400px;
  margin-right: 4px;
`;

function CategorysBtns() {
  const { register, handleSubmit, setValue } = useForm();
  const setTodos = useSetRecoilState(toDoState);
  const todos = useRecoilValue(toDoState);
  const [categories, setCategories] = useRecoilState(categoriesState);
  const [currentCategory, setCurrentCategory] = useRecoilState(
    selectedCategoryState
  );

  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCurrentCategory(event.currentTarget.value as any);
  };

  const addCategory = (data: any) => {
    if (categories.includes(data.newCategory)) {
      window.alert("동일한 이름이 존재합니다.");
    } else {
      setCategories((prev) => [...prev, data.newCategory]);
      setValue("newCategory", "");
      setCurrentCategory(data.newCategory);
    }
  };

  const deleteCategory = () => {
    if (categories.length <= 1) {
      window.alert("You must have at least one category!");
    } else {
      setCategories((prev) =>
        prev.filter((category) => category !== currentCategory)
      );
      setCurrentCategory(
        categories[0] === currentCategory ? categories[1] : categories[0]
      );
      setTodos((prev) =>
        prev.filter((todo) => todo.category !== currentCategory)
      );
    }
  };
  return (
    <Container>
      <form onSubmit={handleSubmit(addCategory)}>
        <Input
          {...register("newCategory", { required: true })}
          placeholder="Please enter a category title to add."
        />
        <button type="submit">Add</button>
      </form>
      <div>
        <Menu onInput={onInput}>
          {categories.map((category, index) => (
            <option
              key={index}
              value={category}
              selected={currentCategory === category ? true : false}
            >
              {category}
            </option>
          ))}
        </Menu>
        <button onClick={deleteCategory}>Delete</button>
      </div>
    </Container>
  );
}

export default CategorysBtns;
