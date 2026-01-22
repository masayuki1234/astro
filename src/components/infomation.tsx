import styled from "styled-components";

export const Info = () => {
  return (
    <>
      <h1 className="infomation">お知らせ</h1>
      <hr />
      <SCcontainer>
        <h1>こんにちは</h1>
      </SCcontainer>
    </>
  );
};

const SCcontainer = styled.div`
  background-color: white;
  color: red;
`;
