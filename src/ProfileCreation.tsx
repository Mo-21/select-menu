import { useEffect, useState } from "react";
import "./ProfileCreation.css";
import classNames from "classnames";

interface Props {
  page: number;
  pageCount: number;
  setPage?: (page: number) => void;
}

const ProfileCreation = () => {
  const [page, setPage] = useState(1);
  const pageCount = 3;

  return (
    <div className="profile-container">
      <div className="components-wrapper">
        <div className="wrapper">
          <ProgressBar page={page} pageCount={pageCount} />
          <ProfileFormPages
            page={page}
            pageCount={pageCount}
            setPage={setPage}
          />
          <Action page={page} pageCount={pageCount} setPage={setPage} />
        </div>
      </div>
    </div>
  );
};

const ProgressBar = ({ page, pageCount }: Props) => {
  return (
    <div className="progress-bar">
      <div
        className="progress"
        style={{
          width: `${(page / pageCount) * 100}%`,
          borderRadius: page === pageCount ? "5px" : "5px 0 0 5px",
        }}
      />
    </div>
  );
};

const ProfileFormPages = ({ page }: Props) => {
  const [currentPage, setCurrentPage] = useState(page);

  useEffect(() => {
    setCurrentPage(page);
  }, [page]);

  return (
    <div
      className={classNames({
        "page-container": true,
        active: currentPage === page,
      })}
    >
      <form className="form-group">
        <div className="input-container">
          {currentPage === 1 && (
            <>
              <h1>Personal Information</h1>
              <img
                src="https://www.w3schools.com/howto/img_avatar.png"
                alt="Avatar"
                className="avatar"
              />
              <input type="text" placeholder="Name" className="input" />
              <input type="email" placeholder="Email" className="input" />
            </>
          )}

          {currentPage === 2 && (
            <>
              <h1>Academic History</h1>
              <input type="text" placeholder="Uni" className="input" />
              <input type="text" placeholder="Degree" className="input" />
            </>
          )}

          {currentPage === 3 && (
            <>
              <h1>Links</h1>
              <input type="text" placeholder="LinkedIn" className="input" />
              <input type="text" placeholder="GitHub" className="input" />
            </>
          )}
        </div>
      </form>
    </div>
  );
};

const Action = ({ page, pageCount, setPage }: Props) => {
  return (
    <>
      <div className="buttons">
        {page < pageCount && (
          <button
            onClick={(event) => {
              event.preventDefault();
              setPage!(page + 1);
            }}
            className="next-button"
          >
            Next
          </button>
        )}
        <div className="page-counter">
          <div className="pages">
            {page} of {pageCount}
          </div>
        </div>
        {page <= pageCount && page > 1 && (
          <button
            onClick={(event) => {
              event.preventDefault();
              setPage!(page - 1);
            }}
            className="previous-button"
          >
            Previous
          </button>
        )}
      </div>
    </>
  );
};

export default ProfileCreation;
