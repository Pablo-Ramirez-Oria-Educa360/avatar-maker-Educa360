import React from "react";
import { Toolbar } from "./Toolbar";
import { UploadButton } from "./UploadButton";
import { MoreMenu } from "./MoreMenu";
import { dispatch } from "../dispatch";
import constants from "../constants";
import useStrings from "../i18n/useStrings";

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
  const { t } = useStrings();
  const hubsReady = hubsAuth && hubsAuth.ready;
  const returnUrl = hubsAuth && hubsAuth.returnUrl;
  const statusKey = hubsStatus && hubsStatus.messageKey;
  const statusText = statusKey ? t(statusKey, null, hubsStatus.message) : hubsStatus && hubsStatus.message;

  return (
    <Toolbar>
      <div className="toolbarContent">
        <span className="appName">{t("app.name")}</span>
        <MoreMenu
          items={
            <>
              <UploadButton onGLBUploaded={onGLBUploaded} />
              <a href="https://github.com/mozilla/hackweek-avatar-maker" target="_blank" rel="noreferrer">
                GitHub
              </a>
            </>
          }
        />
        <button onClick={randomizeConfig}>{t("toolbar.randomize")}</button>
        <button onClick={dispatchResetView}>{t("toolbar.reset")}</button>
        <button onClick={dispatchSendToHubs} disabled={!hubsReady}>
          {t("toolbar.send_to_hubs")}
        </button>
        <button onClick={dispatchExportAvatar} className="primary">
          {t("toolbar.export")}
        </button>
        {returnUrl && (
          <a className="returnButton" href={returnUrl} target="_blank" rel="noopener noreferrer">
            {t("toolbar.return_to_hubs")}
          </a>
        )}
      </div>
      <div className="toolbarStatus">
        {!hubsReady && <span>{t("toolbar.sign_in_hint")}</span>}
        {hubsReady && statusText && <span>{statusText}</span>}
      </div>
      <div className="toolbarNotice">
        <span>
          The 3D models used in this app are ©2020-2022 by individual{" "}
          <a href="https://www.mozilla.org" target="_blank" rel="noreferrer">
            mozilla.org
          </a>{" "}
          contributors. Content available under a{" "}
          <a
            href="https://www.mozilla.org/en-US/foundation/licensing/website-content/"
            target="_blank"
            rel="noreferrer"
          >
            Creative Commons license
          </a>
          .
        </span>
      </div>
    </Toolbar>
  );
}
