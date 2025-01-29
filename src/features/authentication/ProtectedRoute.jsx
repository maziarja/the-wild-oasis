import { useEffect } from "react";
import { useUser } from "./useUser";
import { useNavigate } from "react-router-dom";
import Spinner from "../../ui/Spinner";
import styled from "styled-components";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
  // 1) load authenicated user
  const { isAuthorize, isLoading } = useUser();
  const navigate = useNavigate();
  // 2) check autorize user and bann if its not
  useEffect(
    function () {
      if (!isAuthorize && !isLoading) navigate("/login");
    },
    [isAuthorize, navigate, isLoading]
  );
  // 3) loading spinner
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  // 4) if autorized give access
  if (isAuthorize) return children;
}

export default ProtectedRoute;
