import { useForm } from "react-hook-form";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { categoriesState, selectedCategoryState, toDoState } from "../atoms";
import styled from "styled-components";

interface IForm {
  todo: string;
}

const Input = styled.input`
  margin-top: 20px;
  font-size: 18px;
  border: 1px solid black;
  width: 400px;
  &:focus {
    outline: none;
  }
`;

const SaveBtn = styled.button`
  border: 1px solid black;
  margin-left: 2px;
  padding: 10px 20px;
  cursor: pointer;
`;

function CreateTodo() {
  const categories = useRecoilValue(categoriesState);
  const setTodos = useSetRecoilState(toDoState);
  const category = useRecoilValue(selectedCategoryState);
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const onSubmit = (data: any) => {
    setTodos((oldTodos) => [
      { text: data.todo, id: Date.now(), category },
      ...oldTodos,
    ]);
    setValue("todo", "");
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register("todo", {
            required: "Please enter the content",
            disabled: categories.length === 0 ? true : false,
          })}
          placeholder="Please enter what you want to add"
        />

        <SaveBtn>Add</SaveBtn>
      </form>
    </>
  );
}

export default CreateTodo;
