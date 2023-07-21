import debug from "sabio-debug";
import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { Container, Card, Row } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import locale from "rc-pagination/lib/locale/en_US";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import Swal from "sweetalert2";
import externalLinkService from "../../services/externalLinkService";
import ExternalLink from "./ExternalLink";
import "./externalLinkStyle.css";

const _logger = debug.extend("ExternalLinksList");

function ExternalLinksList() {
  const [pageData, setPageData] = useState({
    urlTypes: [],
    urlTypesComponent: [],
    pageIndex: 0,
    pageSize: 10,
    total: 0,
  });
  const navigate = useNavigate();

  const onChange = (page) => {
    setPageData((prevState) => {
      let newPgData = { ...prevState };
      newPgData.pageIndex = page - 1;
      return newPgData;
    });
  };

  useEffect(() => {
    externalLinkService
      .getExternalLinksByUserId(pageData.pageIndex, pageData.pageSize)
      .then(onGetUserSuccess)
      .catch(onGetUserError);
  }, [pageData.pageIndex]);

  const onGetUserSuccess = (response) => {
    _logger("onGetUserSuccess", response);

    setPageData((prevState) => {
      const updatedState = { ...prevState };
      let userLinks = response.item.pagedItems;
      updatedState.urlTypes = userLinks;
      _logger("what is updatedState", Array.isArray(userLinks));
      updatedState.urlTypesComponent = userLinks.map(mapExternalLink);
      return updatedState;
    });
  };

  const onGetUserError = (err) => {
    _logger("onGetUserError", err);

    Swal.fire({
      icon: "error",
      title: "Could not load Users.",
      confirmButtonText: "Please try again.",
    });
  };

  const mapExternalLink = (anExternalLink) => {
    _logger(anExternalLink);
    return (
      <ExternalLink
        key={"ExternalLink" + anExternalLink.id}
        externalLink={anExternalLink}
        onDeleteClicked={onDeleteRequested}
      />
    );
  };

  const onDeleteRequested = (user) => {
    _logger("Deleting Link");
    Swal.fire({
      title: "Are you sure?",
      text: "Deleting this link can not be reverted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      confirmButtonColor: "red",
    })
      .then((result) => {
        if (result.isConfirmed) {
          const onDeleteHandler = onDeleteSuccess(user.id);
          externalLinkService
            .deleteExternalLink(user.id)
            .then(onDeleteHandler)
            .catch(onDeleteError);
        }
      })
      .catch((err) => {
        if (err) {
          Swal.fire("Error.", "User's link was not deleted.", "error");
        }
      });
  };

  const onDeleteSuccess = (response) => {
    _logger("onDeleteSuccess", response);

    Swal.fire("Deleted!", "Link has been deleted.", "success");

    const filteredUsers = (user) => {
      let result = false;
      if (user.id === response) {
        result = true;
      }
      return result;
    };

    setPageData((prevState) => {
      let update = { ...prevState };
      const index = prevState.urlTypes.findIndex(filteredUsers);
      update.urlTypes.splice(index, 1);
      update.urlTypesComponent = update.urlTypes.map(mapExternalLink);
      return update;
    });
  };

  const onDeleteError = (err) => {
    _logger("onDeleteError", err);

    notyf.error(err);
  };

  const onClickAdd = () => {
    const payload = {
      type: "LINK_ADD",
      payload: null,
    };
    navigate("/externallinks/add", { state: payload });
  };

  return (
    <React.Fragment>
      <Helmet title="Users" />
      <Container>
        <Card>
          <Card.Header>
            <Card.Title>Social Media Links</Card.Title>
            <Row className="d-flex justify-content-end ">
              <div className="text-sm-start">
                <button
                  type="button"
                  className="btn btn-primary btn-lg float-end my-xxl-n2"
                  onClick={onClickAdd}
                >
                  Create New Link
                </button>
              </div>
            </Row>
            {pageData.urlTypesComponent}
          </Card.Header>{" "}
          <Pagination
            onChange={onChange}
            pageSize={pageData.pageSize}
            current={pageData.pageIndex + 1}
            total={pageData.total}
            locale={locale}
            className="m-lg-4 text-center"
          />
        </Card>
      </Container>
    </React.Fragment>
  );
}

export default ExternalLinksList;
