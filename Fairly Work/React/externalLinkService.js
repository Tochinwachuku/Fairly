import axios from "axios";
import * as helper from "../services/serviceHelpers";

const externalLinkEndPoint = `${helper.API_HOST_PREFIX}/api/externallinks/`;

const getExternalLinksByUserId = (pageIndex, pageSize) => {
  const config = {
    method: "GET",
    url: `${externalLinkEndPoint}paginate/?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const deleteExternalLink = (id) => {
  const config = {
    method: "DELETE",
    url: `${externalLinkEndPoint}${id}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const updateExternalLink = (payload) => {
  const config = {
    method: "PUT",
    url: `${externalLinkEndPoint}${payload.id}`,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const addExternalLink = (payload) => {
  const config = {
    method: "POST",
    url: `${externalLinkEndPoint}`,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const externalLinkService = {
  getExternalLinksByUserId,
  deleteExternalLink,
  updateExternalLink,
  addExternalLink,
};

export default externalLinkService;
