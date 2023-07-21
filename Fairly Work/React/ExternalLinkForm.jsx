import debug from "sabio-debug";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import externalLinkSchema from "../../schemas/externalLinkSchema";
import { getTypes } from "../../services/lookUpService";
import externalLinkService from "../../services/externalLinkService";
import "rc-pagination/assets/index.css";
import "./externalLinkStyle.css";

export default function ExternalLinksForm(props) {
  const _logger = debug.extend("ExternalLinksForm");
  const navigate = useNavigate();
  const { state } = useLocation();

  const [externalLinkformData, setExternalLinkFormData] = useState({
    id: 0,
    urlTypeId: "",
    entityId: 0,
    entityTypeId: "",
    url: "",
    isUpdating: false,
  });

  const [pageData, setPageData] = useState({
    urlTypes: [],
    urlTypesComponent: [],
    entityTypes: [],
    entityTypesComponent: [],
  });

  const mapLink = (aLink) => {
    return (
      <option key={`LinkType_${aLink.id}`} value={aLink.id}>
        {aLink.name}
      </option>
    );
  };

  const filterEntityTypes = (entity) => {
    if (props.currentUser.roles.includes("Candidate")) {
      return entity.id === 2;
    } else {
      return entity.id === 2 || entity.id === 4; //2 = "User" / 4 = "Organization"
    }
  };

  const mapEntity = (entity) => {
    let entityName = entity.name;
    if (entityName === "User") {
      entityName = "Personal";
    }
    return (
      <option value={entity.id} key={`EntityType_${entity.id}`}>
        {entityName}
      </option>
    );
  };

  useEffect(() => {
    _logger("location state useEffect firing", state);
    if (state?.type === "LINK_EDIT" && state.payload) {
      setExternalLinkFormData((prevState) => {
        const newSt = { ...prevState };
        newSt.id = state.payload.id;
        newSt.urlTypeId = state.payload.urlTypeId;
        newSt.entityId = state.payload.entityId;
        newSt.entityTypeId = state.payload.entityTypeId;
        newSt.url = state.payload.url;
        newSt.isUpdating = true;
        return newSt;
      });
    }
  }, []);

  const onHandleSubmit = (value) => {
    _logger(value);

    if (value.entityTypeId === 2) {
      value.entityId = props.currentUser.id;
      _logger(props);
    }

    if (value.entityTypeId === 4) {
      value.entityId = props.currentUser.orgId;
      _logger(props);
    }

    if (state?.type === "LINK_EDIT" && state.payload) {
      externalLinkService
        .updateExternalLink(value)
        .then(onUpdateSuccess)
        .catch(onUpdateError);
      _logger("Updated", value);
    } else {
      externalLinkService
        .addExternalLink(value)
        .then(onAddSuccess)
        .catch(onAddError);
      _logger("Added", value);
    }
  };

  const onUpdateSuccess = (response) => {
    _logger("onUpdateSuccess", response);

    Swal.fire({
      icon: "success",
      title: "Link updated!",
      confirmButtonText: "Ok.",
    });
    navigate("/externallinks");
  };

  const onUpdateError = (err) => {
    _logger("onUpdateError", err);

    Swal.fire({
      icon: "error",
      title: "Link could not be updated.",
      confirmButtonText: "Please try again.",
    });
  };

  const onAddSuccess = (response) => {
    _logger("onAddSuccess", response);

    Swal.fire({
      icon: "success",
      title: "Link added!",
      confirmButtonText: "Ok.",
    });

    navigate("/externallinks");
  };

  const onAddError = (err) => {
    _logger("onAddError", err);

    Swal.fire({
      icon: "error",
      title: "Link could not be added.",
      confirmButtonText: "Please try again.",
    });
  };

  useEffect(() => {
    getTypes(["UrlTypes", "EntityTypes"])
      .then(onGetTypesSuccess)
      .catch(onGetTypesError);
  }, []);

  const onGetTypesSuccess = (response) => {
    _logger(response, "lookup success");
    setPageData((prevState) => {
      const newSt = { ...prevState };
      newSt.urlTypes = response.item.urlTypes.map(mapLink);
      newSt.entityTypes = response.item.entityTypes
        .filter(filterEntityTypes)
        .map(mapEntity);
      return newSt;
    });
  };

  const onGetTypesError = (err) => {
    _logger(err, "lookUp error");

    Swal.fire({
      icon: "error",
      title: "Could not get Type.",
      confirmButtonText: "Please try again.",
    });
  };

  const onGoBack = () => {
    _logger("go to users list");

    navigate("/externallinks");
  };

  return (
    <div className="container py-5 h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-lg-8 col-xl-6">
          <div className="card rounded-3">
            <div className="card-body p-4 p-md-5">
              <h2 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2 text-md-center text-success">
                {state?.type === "LINK_EDIT"
                  ? "Edit Social Media Link"
                  : "Add Social Media Link"}
              </h2>
              <Formik
                enableReinitialize={true}
                initialValues={externalLinkformData}
                onSubmit={onHandleSubmit}
                validationSchema={externalLinkSchema}
              >
                <Form className="px-md-2">
                  <label className="form-label" htmlFor="urlType">
                    Select Media Platform:{" "}
                  </label>
                  <Field
                    name="urlTypeId"
                    id="urlTypeId"
                    component="select"
                    className="form-control"
                  >
                    <option value="0">Select a Platform</option>
                    {pageData.urlTypes}
                  </Field>
                  <ErrorMessage
                    name="urlTypeId"
                    component="div"
                    className="text-danger"
                  />
                  <br />
                  <label className="form-label" htmlFor="entityTypeId">
                    Type of Link:
                  </label>
                  <Field
                    name="entityTypeId"
                    id="entityTypeId"
                    component="select"
                    className="form-control"
                  >
                    <option value="0">Select Type of Media Link</option>
                    {pageData.entityTypes}
                  </Field>
                  <ErrorMessage
                    name="entityTypeId"
                    component="div"
                    className="text-danger"
                  />
                  <br />
                  <label className="form-label" htmlFor="url">
                    Url Link:{" "}
                  </label>
                  <Field
                    id="url"
                    type="text"
                    name="url"
                    className="form-control"
                    placeholder="Enter Media Link"
                  ></Field>
                  <ErrorMessage
                    name="url"
                    component="div"
                    className="text-danger"
                  />

                  <br />
                  <button
                    type="submit"
                    className="btn btn-success btn-lg mb-1 float-start"
                    onSubmit={onHandleSubmit}
                  >
                    {state?.type === "LINK_EDIT" && state.payload
                      ? "Update"
                      : "Submit"}
                  </button>
                  <button
                    type="submit"
                    className="btn btn-danger btn-lg mb-1 float-end"
                    onClick={onGoBack}
                  >
                    Go Back
                  </button>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

ExternalLinksForm.propTypes = {
  currentUser: PropTypes.shape({
    id: PropTypes.number.isRequired,
    firstName: PropTypes.string.isRequired,
    mi: PropTypes.string,
    lastName: PropTypes.string.isRequired,
    avatarUrl: PropTypes.string.isRequired,
    orgId: PropTypes.number.isRequired,
    roles: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};
