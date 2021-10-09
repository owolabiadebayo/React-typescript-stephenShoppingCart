import styled from "styled-components";
import { IconButton } from "@material-ui/core";

export const Wrapper = styled.div`
  @media screen and (min-width: 640px) {
    margin: 40px;
  }
`;

export const StyledButton = styled(IconButton)`
  position: fixed;
  top: 10px;
  color: blue;
  right: 10px;
  background: #fff;
`;
