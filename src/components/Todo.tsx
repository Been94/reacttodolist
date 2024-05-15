import { useSetRecoilState, useRecoilValue } from "recoil";
import { IToDo, toDoState, categoriesState } from "../atoms";
import styled from "styled-components";
import React from "react";

const List = styled.li`
  position: relative;
  margin-top: 5px;
  background-color: black;
  margin-bottom: 10px;
  padding: 15px;
  color: white;
`;

const DeleteBtn = styled.button`
  position: absolute;
  right: 5px;
  top: 5px;
  width: 20px;
  height: 20px;
  border: none;
  color: red;
  font-weight: bold;
  border-radius: 50%;
  cursor: pointer;
  &:hover {
    background-color: pink;
  }
`;

const Text = styled.span`
  font-size: 15px;
  margin-bottom: 10px;
`;

const Btn = styled.button<{ isCategory: boolean }>`
  border: none;
  border-radius: 60px;
  margin-right: 10px;
  padding: 7px;
  font-size: 10px;
  font-weight: 500;
  margin-top: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: ${(props) => (props.isCategory ? "not-allowed" : "pointer")};
  color: ${(props) => (props.isCategory ? "white" : "none")};
  &:hover {
    color: ${(props) => (props.isCategory ? "none" : "white")};
    background-color: ${(props) => (props.isCategory ? "none" : "gray")};
  }
`;

function Todo({ text, id, category }: IToDo) {
  const setTodos = useSetRecoilState(toDoState);
  const categories = useRecoilValue(categoriesState);

  const changeCategoryOfTodo = (newCategory: any) => {
    setTodos((oldTodos) => {
      const targetIndex = oldTodos.findIndex((toDo) => toDo.id === id);
      return [
        ...oldTodos.slice(0, targetIndex),
        { text, id, category: newCategory },
        ...oldTodos.slice(targetIndex + 1),
      ];
    });
  };

  const deleteTodo = (event: React.MouseEvent<HTMLButtonElement>) => {
    const deleteList = event.currentTarget.parentNode
      ?.parentNode as HTMLElement | null;

    setTodos((oldTodos) => {
      const targetIndex = oldTodos.findIndex(
        (toDo) => toDo.id === Number(deleteList?.id)
      );
      return [
        ...oldTodos.slice(0, targetIndex),
        ...oldTodos.slice(targetIndex + 1),
      ];
    });
  };

  return (
    <List id={id.toString()}>
      <Text>{text}</Text>
      <div>
        {categories.map((cate) => (
          <Btn
            isCategory={category === cate}
            key={cate}
            disabled={category === cate}
            onClick={() => changeCategoryOfTodo(cate)}
          >
            {category === cate ? cate : "move to " + cate}
          </Btn>
        ))}
        <DeleteBtn onClick={deleteTodo}>X</DeleteBtn>
      </div>
    </List>
  );
}

export default Todo;
