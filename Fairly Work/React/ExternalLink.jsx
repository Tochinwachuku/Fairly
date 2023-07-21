import React from "react";
import blankAvatar from "../../assets/img/avatars/blank-avatar.jpg";
import { useNavigate } from "react-router-dom";
import { Table } from "react-bootstrap";
import PropTypes from "prop-types";
import { BsFillTrashFill } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import logger from "sabio-debug";
import Swal from "sweetalert2";

const ExternalLink = ({ externalLink, onDeleteClicked }) => {
  const { user } = externalLink;
  const navigate = useNavigate();
  const _logger = logger.extend("ExternalLink");
  _logger("props", externalLink);

  const onLocalDelete = () => {
    onDeleteClicked(externalLink);
  };

  const onEditRequest = () => {
    _logger("go to users form", externalLink.id);
    const state = {
      type: "LINK_EDIT",
      payload: externalLink,
    };
    navigate(`/externallinks/${user.id}/edit`, { state });
  };

  const onLocalEdit = () => {
    Swal.fire({
      icon: "warning",
      title: "Are you sure?",
      text: "This will update the users link details!",
      showCancelButton: true,
      confirmButtonText: "Update",
    })
      .then((result) => {
        if (result.isConfirmed) {
          onEditRequest();
        }
      })
      .catch((err) => {
        if (err) {
          Swal.fire("Error.", "Link was not updated.", "error");
        }
      });
  };

  return (
    <div className="row mt-xxl-4 text-lg">
      <Table className="mb-0 table-hover table-striped table-bordered">
        <tbody>
          <thead className="bg-body">
            <td width="8%">
              <img
                src={user.avatarUrl || blankAvatar}
                width="50"
                height="50"
                className="rounded-circle my-n1"
                alt="avatar"
              />
            </td>
            <td className="text-md-center p-1">
              Name: {user.firstName} {user.lastName}
            </td>
            <td className="text-md-center" width="8%">
              {" "}
              <a
                href={externalLink.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {externalLink.url}
              </a>
            </td>
            <td className="text-md-center">
              <FiEdit
                cursor="pointer"
                className="iconsize"
                onClick={onLocalEdit}
              />
            </td>
            <td className="text-md-center">
              <BsFillTrashFill
                cursor="pointer"
                className="iconsize"
                onClick={onLocalDelete}
              />{" "}
            </td>
          </thead>
        </tbody>
      </Table>
    </div>
  );
};

ExternalLink.propTypes = {
  onDeleteClicked: PropTypes.func.isRequired,
  externalLink: PropTypes.shape({
    id: PropTypes.number.isRequired,
    user: PropTypes.shape({
      id: PropTypes.number.isRequired,
      firstName: PropTypes.string.isRequired,
      mi: PropTypes.string,
      lastName: PropTypes.string.isRequired,
      avatarUrl: PropTypes.string.isRequired,
    }).isRequired,
    urlType: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
    url: PropTypes.string.isRequired,
    entityType: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
  }),
};

export default React.memo(ExternalLink);
