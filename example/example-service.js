import ServiceLayer from "../../../models/serviceLayer";

const requests = {
  users: {
    endpoint: "services/users",
    method: "GET",
    args: {},
    text: "userName",
    value: "userId",
  },
  activities: {
    endpoint: "services/activity-types",
    method: "GET",
    args: {},
    text: "text",
    value: "value",
  },
  companies: {
    endpoint: "services/companies",
    method: "GET",
    args: { type: "parentCompany" },
    text: "name",
    value: "companyId",
  },
};

export const services = new ServiceLayer(
  {
    contentType: "application/json",
  },
  requests
);

services.init();
