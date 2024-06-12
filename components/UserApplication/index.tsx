import { useEffect, useState } from "react";
import ApplicationView from "./ApplicationView";
import { getUserId } from "@/utils/jwt";
import { instance } from "@/utils/instance";
import { ApplicationResponse } from "./Application.types";
import ApplicationEmpty from "./ApplicationEmpty";

function Application() {
  const [hasApplications, setHasApplications] = useState(false);

  useEffect(() => {
    const getApplications = async () => {
      const userId = getUserId();

      try {
        const response = await instance.get<ApplicationResponse>(
          `/users/${userId}/applications`,
          {
            params: {
              offset: 0,
              limit: 1,
            },
          }
        );

        setHasApplications(response.data.items.length > 0);
      } catch (error) {
        console.log("GET ApplicationList Error:", error);
      }
    };

    getApplications();
  }, []);

  return hasApplications ? <ApplicationView /> : <ApplicationEmpty />;
}

export default Application;
