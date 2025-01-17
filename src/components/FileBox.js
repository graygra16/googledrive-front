import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { switchFile } from "../store/actions/action";

const Box = styled.div`
  display: inline-flex;
  flex-direction: column;
  width: 220px;
  height: 200px;
  border: 1px solid black;
  cursor: pointer;
  margin-right: 15px;
  margin-bottom: 10px;
  background-color: #f1f3f4;
  align-items: center;
  border: 1px solid #cccccc;
  border-radius: 5px;
`;

const Image = styled.div`
  width: 220px;
  height: 145px;
  background-color: white;
  border-bottom: none;
  border-radius: 5px 5px 0 0;
`;

const Title = styled.div`
  width: 200px;
  height: 45px;
  background-color: white;
  border: 1px solid #cccccc;
  border-bottom: none;
  border-radius: 0 0 5px 5px;
  padding: 10px;
`;

const FileBox = ({ onRightFileClick }) => {
  const dispatch = useDispatch();
  const [file, setFile] = useState(
    useSelector((state) => state?.file.file) || []
  );
  const [dragId, setDragId] = useState();

  const handleDrag = (ev) => {
    setDragId(Number(ev.currentTarget.id));
  };

  const onBoxClick = (e) => {
    e.preventDefault();
    onRightFileClick(e);
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
      }}
    >
      {file
        .sort((a, b) => a.order - b.order)
        .map((fileBox) => (
          <div onContextMenu={onBoxClick}>
            <Box
              id={fileBox.id}
              draggable={true}
              onDragOver={(ev) => ev.preventDefault()}
              onDragStart={handleDrag}
              onDrop={(e) => switchFile(dispatch, dragId, e.currentTarget.id)}
            >
              <Image>dd</Image>
              <Title>{fileBox.content}</Title>
            </Box>
          </div>
        ))}
    </div>
  );
};

export default FileBox;
