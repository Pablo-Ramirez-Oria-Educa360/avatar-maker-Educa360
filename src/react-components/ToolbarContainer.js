import React from "react";
import { Toolbar } from "./Toolbar";
import { UploadButton } from "./UploadButton";
import { MoreMenu } from "./MoreMenu";
import { dispatch } from "../dispatch";
import constants from "../constants";

function dispatchResetView() {
  dispatch(constants.resetView);
}

function dispatchExportAvatar() {
  dispatch(constants.exportAvatar);
}

function dispatchSendToHubs() {
  dispatch(constants.sendToHubs);
}

export function ToolbarContainer({ onGLBUploaded, randomizeConfig, hubsAuth, hubsStatus }) {
  const hubsReady = hubsAuth && hubsAuth.ready;
  const returnUrl = hubsAuth && hubsAuth.returnUrl;
  const statusText = hubsStatus && hubsStatus.message;
  return (
    <Toolbar>
      <div className="toolbarContent">
        <span className="appName">Hackweek Avatar Maker</span>
        <MoreMenu
          items={
            <>
              <UploadButton onGLBUploaded={onGLBUploaded} />
              <a href="https://github.com/mozilla/hackweek-avatar-maker" target="_blank">
                GitHub
              </a>
            </>
          }
        ></MoreMenu>
        <button onClick={randomizeConfig}>Randomize avatar</button>
        <button onClick={dispatchResetView}>Reset camera view</button>
        <button onClick={dispatchSendToHubs} disabled={!hubsReady}>
          Send to Hubs
        </button>
        <button onClick={dispatchExportAvatar} className="primary">
          Export avatar
        </button>
        {returnUrl && (
          <a className="returnButton" href={returnUrl} target="_blank" rel="noopener noreferrer">
            Return to Hubs
          </a>
        )}
      </div>
      <div className="toolbarStatus">
        {!hubsReady && <span>Sign in to Hubs to send avatars.</span>}
        {hubsReady && statusText && <span>{statusText}</span>}
      </div>
      <div className="toolbarNotice">
        <span>The 3D models used in this app are ©2020-2022 by individual <a href="https://www.mozilla.org" target="_blank" noreferrer>mozilla.org</a> contributors.
          Content available under a <a href="https://www.mozilla.org/en-US/foundation/licensing/website-content/" target="_blank" noreferrer>Creative Commons license</a>.</span>
      </div>
    </Toolbar>
  );
}
