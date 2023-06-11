import { ReactElement, useState, useContext, useEffect } from "react";
import AuthenticationContext from "./AuthenticationContext";

export default function Authorized(props: authorizedProps) {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const { claims } = useContext(AuthenticationContext);

  useEffect(() => {
    if (props.role) {
      const index = claims.findIndex(
        (claim) => claim.name === "role" && claim.value === props.role
      );
      setIsAuthorized(index > -1);
    } else {
      setIsAuthorized(claims.length > 0);
    }
  }, [claims, props.role]);

  return <>{isAuthorized ? props.authorized : props.nonAuthorized}</>;
}

interface authorizedProps {
  authorized: ReactElement;
  nonAuthorized?: ReactElement;
  role?: string;
}
