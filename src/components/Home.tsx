import CreateTodo from "./CreateTodo";
import Todo from "./Todo";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { selectedCategoryState, toDoSelector, categoriesState } from "../atoms";
import styled from "styled-components";
import { useEffect } from "react";
import CreateCategory from "./CreateCategory";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 500px;
  margin: 30px auto;
  background-color: #ecf0f1;
`;

const Title = styled.h1`
  font-weight: 200;
  font-size: 40px;
`;

const Line = styled.div`
  height: 1px;
  width: 100%;
  background-color: gray;
  margin-bottom: 10px;
  margin-top: 10px;
`;

const SubContainer = styled.div`
  width: 470px;
  @media (max-width: 420px) {
    width: 350px;
  }
`;

const TodoLists = styled.ul`
  width: inherit;
`;

function Home() {
  const todos = useRecoilValue(toDoSelector);
  const categories = useRecoilValue(categoriesState);
  const setCurrentCategory = useSetRecoilState(selectedCategoryState);
  useEffect(() => {
    setCurrentCategory(categories[0]);
  }, []);

  return (
    <Container>
      <div>
        <Title>To Do...:)</Title>
        <CreateCategory />
      </div>

      <SubContainer>
        <CreateTodo />

        <Line />
        <TodoLists>
          {todos?.map((todo) => (
            <Todo key={todo.id} {...todo}></Todo>
          ))}
        </TodoLists>
      </SubContainer>
      {todos.length != 0 ? <Line /> : null}
    </Container>
  );
}

export default Home;
