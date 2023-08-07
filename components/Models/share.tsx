import { TextField, Button } from "@mui/material";
import models from "./index";
import copy from "copy-to-clipboard";
import message from "../Message";

function GOModels(props) {
  const { link } = props;
  return (
    <div id="share-modal-container">
      <input
        onChange={(e) => {
          if (!e.target.checked) {
            models.destroy();
          }
        }}
        type="checkbox"
        checked
        id="share-modal"
        className="modal-toggle"
      />
      <label htmlFor="share-modal" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <label
            onClick={()=>{ models.destroy()}}
            htmlFor=""
            className="cursor-pointer btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">Share Link With Your Friends</h3>
          <div
            className="flex items-center
                    space-x-4
                    "
          >
            <TextField
              margin="normal"
              required
              fullWidth
              value={link}
              label="Share Link"
              autoFocus
            />
            <div
              className="
                        btn
                        mt-2
                        w-24
                        h-14
                        border-none	
                        bg-blue-500"
              onClick={async () => {
                try {
                  copy(link);
                  message.success({ content: "Copy link successfully" });
                } catch (error) {
                  message.error({ content: "copy error" });
                }
              }}
            >
              Copy
            </div>
          </div>
          {/* <p className="py-4">
            Any purchase made through your personal link will earn you a
            commission.
          </p> */}
          <div className="flex space-x-2 items-end">
            <h4 className="text-lg font-bold">Share</h4>
            <a
              href={`mailto:?subject=Deal Share in GoFlashDeal&body=Deal Share in ${link}`}
            >
              <div className="fill-blue-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="white"
                  className="w-8 h-8 fill-blue-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                  />
                </svg>
              </div>
            </a>

            <div></div>
          </div>
        </label>
      </label>
    </div>
  );
}

export default GOModels;
