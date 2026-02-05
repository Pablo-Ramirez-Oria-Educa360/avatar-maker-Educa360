import React, { useState } from "react";
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

export function ToolbarContainer({ onGLBUploaded, randomizeConfig, hubsAuth, hubsStatus }) {
  const { t } = useStrings();
  const hubsReady = hubsAuth && hubsAuth.ready;
  const returnUrl = (hubsAuth && hubsAuth.returnUrl) || "https://educa360.es";
  const statusKey = hubsStatus && hubsStatus.messageKey;
  const statusText = statusKey ? t(statusKey, null, hubsStatus.message) : hubsStatus && hubsStatus.message;
  const [collapsed, setCollapsed] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [avatarName, setAvatarName] = useState(t("avatar.default_name"));

  function dispatchSendToHubs() {
    dispatch(constants.sendToHubs, {
      name: (avatarName || "").trim() || t("avatar.default_name")
    });
  }

  function handleConfirm() {
    if (confirmAction === "randomize") {
      randomizeConfig();
    }
    if (confirmAction === "return") {
      window.open(returnUrl, "_blank", "noopener,noreferrer");
    }
    setConfirmAction(null);
  }

  return (
    <Toolbar className={collapsed ? "collapsed" : ""}>
      <div className="toolbarHeader">
        <span className="appName">{t("app.name")}</span>
        <div className="toolbarHeaderActions">
          <button
            className="toolbarToggle"
            type="button"
            onClick={() => setCollapsed(!collapsed)}
            aria-expanded={!collapsed}
            aria-label={collapsed ? t("toolbar.expand") : t("toolbar.collapse")}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              {collapsed ? <path d="M6 9l6 6 6-6" /> : <path d="M6 15l6-6 6 6" />}
            </svg>
          </button>
        </div>
      </div>
      <div className="toolbarBody">
        <div className="toolbarContent">
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
          <div className="toolbarActions">
            <button type="button" onClick={() => setConfirmAction("randomize")} className="btn">
              <span className="btnIcon" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <rect x="3" y="3" width="18" height="18" rx="2.5" ry="2.5" />
                  <circle cx="8" cy="8" r="1" />
                  <circle cx="12" cy="12" r="1" />
                  <circle cx="16" cy="16" r="1" />
                  <circle cx="16" cy="8" r="1" />
                  <circle cx="8" cy="16" r="1" />
                </svg>
              </span>
              <span>{t("toolbar.randomize")}</span>
            </button>
            <button type="button" onClick={() => setShowExportModal(true)} className="btn btnPrimary">
              <span className="btnIcon" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </span>
              <span>{t("toolbar.finish")}</span>
            </button>
            {returnUrl && (
              <button type="button" className="returnButton btn btnGhost" onClick={() => setConfirmAction("return")}>
                <span className="btnIcon" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path d="M3 11l9-8 9 8" />
                    <path d="M5 10v10h5v-6h4v6h5V10" />
                  </svg>
                </span>
                <span>{t("toolbar.return_to_hubs")}</span>
              </button>
            )}
          </div>
        </div>
        {statusText && (
          <div className="toolbarStatus">
            <span>{statusText}</span>
          </div>
        )}
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
      </div>
      {showExportModal && (
        <div className="modalOverlay" role="presentation" onClick={() => setShowExportModal(false)}>
          <div className="modal" role="dialog" aria-modal="true" aria-labelledby="exportModalTitle" onClick={(event) => event.stopPropagation()}>
            <div className="modalHeader">
              <div>
                <h3 id="exportModalTitle">{t("modal.title")}</h3>
                <p className="modalSubtitle">{t("modal.subtitle")}</p>
              </div>
              <button
                type="button"
                className="modalClose"
                onClick={() => setShowExportModal(false)}
                aria-label={t("modal.close")}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M6 6l12 12" />
                  <path d="M18 6l-12 12" />
                </svg>
              </button>
            </div>
            <div className="modalSteps">
              <div className="modalField">
                <label className="modalLabel" htmlFor="avatarNameInput">
                  {t("modal.name.label")}
                </label>
                <input
                  id="avatarNameInput"
                  className="modalInput"
                  type="text"
                  value={avatarName}
                  onChange={event => setAvatarName(event.target.value)}
                  placeholder={t("modal.name.placeholder")}
                  maxLength={64}
                />
                <span className="modalHelper">{t("modal.name.helper")}</span>
              </div>
              <div className="modalStep">
                <span className="modalStepTitle">{t("modal.step.download.title")}</span>
                <span className="modalStepBody">{t("modal.step.download.body")}</span>
              </div>
              <div className="modalStep">
                <span className="modalStepTitle">{t("modal.step.send.title")}</span>
                <span className="modalStepBody">{t("modal.step.send.body")}</span>
              </div>
            </div>
            {!hubsReady && <div className="modalHint">{t("modal.auth_hint")}</div>}
            {statusText && <div className="modalStatus">{statusText}</div>}
            <div className="modalActions">
              <button type="button" onClick={dispatchExportAvatar} className="btn btnAccent">
                <span className="btnIcon" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path d="M12 3v12" />
                    <path d="M8 11l4 4 4-4" />
                    <path d="M4 21h16" />
                  </svg>
                </span>
                <span>{t("modal.action.download")}</span>
              </button>
              <button type="button" onClick={dispatchSendToHubs} disabled={!hubsReady} className="btn btnAccent">
                <span className="btnIcon" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path d="M3 11l18-8-8 18-2-7-8-3z" />
                  </svg>
                </span>
                <span>{t("modal.action.send")}</span>
              </button>
            </div>
          </div>
        </div>
      )}
      {confirmAction && (
        <div className="modalOverlay" role="presentation" onClick={() => setConfirmAction(null)}>
          <div className="modal" role="dialog" aria-modal="true" onClick={(event) => event.stopPropagation()}>
            <div className="modalHeader">
              <div>
                <h3>{t(`confirm.${confirmAction}.title`)}</h3>
                <p className="modalSubtitle">{t(`confirm.${confirmAction}.body`)}</p>
              </div>
              <button type="button" className="modalClose" onClick={() => setConfirmAction(null)} aria-label={t("modal.close")}>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M6 6l12 12" />
                  <path d="M18 6l-12 12" />
                </svg>
              </button>
            </div>
            <div className="modalActions">
              <button type="button" className="btn btnGhost" onClick={() => setConfirmAction(null)}>
                <span>{t("confirm.cancel")}</span>
              </button>
              <button type="button" className="btn btnAccent" onClick={handleConfirm}>
                <span>{t(`confirm.${confirmAction}.confirm`)}</span>
              </button>
            </div>
          </div>
        </div>
      )}
      <button type="button" onClick={dispatchResetView} className="floatingResetButton" aria-label={t("toolbar.reset")}>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
          <circle cx="12" cy="13" r="3" />
        </svg>
      </button>
    </Toolbar>
  );
}
