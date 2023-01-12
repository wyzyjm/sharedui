import {
  IButtonStyles, Link as FabricLink, Panel, PanelType, IconButton as FabricIconButton,
  PrimaryButton, ProgressIndicator, Stack, useTheme, Separator
} from "@fluentui/react";
import { values, sortBy } from "lodash";
import React, { useEffect, useRef, useState } from "react";
import "./Notification.scss";
import "../core.scss";
import { StatusIcons } from "../themed-icons";
import { INTL } from "../../../util/intlUtil";
import { NotificationLocalizationFormatMessages } from "../../../clientResources";
import { initializeComponent, useLocalization, withLocalization } from "../../../services/localization";

export enum ClientNotificationDomain {
  Subscription = "Subscription",
}

export enum ClientNotificationStatus {
  Failed = "Failed",
  Succeeded = "Succeeded",
  PartiallySucceeded = "PartiallySucceeded",
  Processing = "Processing",
  Uploading = "Uploading",
  Canceled = "Canceled",
  Expired = "Expired",
  Paused = "Paused",
  Suspended = "Suspended",
}

interface INotificationDomainPropertiesBase { }

export interface ClientNotification {
  id: string;
  domain: ClientNotificationDomain;
  title: string | JSX.Element | (() => any);
  message: string | JSX.Element | (() => any);
  status: ClientNotificationStatus;
  createdAt: Date;
  updatedAt: Date;
  tagId?: string;
  blockBeforeUnload?: boolean;
  data?: string;
  domainProperties?: INotificationDomainPropertiesBase;
  silent: boolean;
}
interface ClientNotifications {
  [id: string]: ClientNotification;
}
const CloseButton = (props: {
  onClick: () => void;
  autoFocus?: boolean;
  buttonId?: string;
  styles?: IButtonStyles;
}): JSX.Element => {
  const theme = useTheme();

  return (
    <FabricIconButton
      iconProps={{ iconName: "Cancel" }}
      ariaLabel={INTL.formatMessage(NotificationLocalizationFormatMessages.Close)}
      onClick={props.onClick}
      autoFocus={!!props.autoFocus}
      data-bi-name={props.buttonId}
      styles={props.styles ?? { icon: { color: theme.palette.neutralPrimary } }}
    />
  );
};

const getDomainDisplayName = (domain: ClientNotificationDomain): string => {
  switch (domain) {
    case ClientNotificationDomain.Subscription:
      return 'Subscription';

    default:
      break;
  }
};

function FormattedRelative(props: { value: Date }): JSX.Element {
  const msBefore = Date.now() - props.value.getTime();
  const delta = -msBefore / 1000;
  return (
    <div>{props.value.toLocaleDateString()}</div>
  );
}

/**
 * Order notifications in the order:
 *  1. Processing items that are created just now
 *  2. Processing items that were created earlier
 *  3. Other notifications created just now
 *  4. Other notifications created earlier
 * @param notifications Input notifications.
 * @returns Ordered notifications list.
 */

function sortedNotifications(notifications: ClientNotification[]): ClientNotification[] {
  // don't use _.sortBy because `[1, -3] > [1, -4]` in JS
  const order: [number, number, ClientNotification][] = notifications.map((i) => {
    let [statusOrder, timeOrder] = [0, 0];
    if (i.status === ClientNotificationStatus.Processing) {
      // order by creation time if is an ongoing notification to avoid frequent
      // re-orders among processing items
      [statusOrder, timeOrder] = [0, -i.createdAt];
    } else {
      // otherwise prioritize recently updated items
      [statusOrder, timeOrder] = [1, -i.updatedAt];
    }
    return [statusOrder, timeOrder, i];
  });
  return order
    .sort((a, b) => {
      if (a[0] !== b[0]) return a[0] - b[0];
      return a[1] - b[1];
    })
    .map((i) => i[2]);
}

export function getNotificationMessage(
  content: string | JSX.Element,
  buttonPrimaryUrl?: string,
  buttonPrimaryContent?: string,
  buttonSecondaryUrl?: string,
  buttonSecondaryContent?: string,
): JSX.Element {
  const primaryShow = buttonPrimaryUrl && buttonPrimaryContent;
  const primaryShowAsLink =
    primaryShow && !buttonPrimaryUrl.startsWith("http://") && !buttonPrimaryUrl.startsWith("https://");
  const secondaryShow = buttonSecondaryUrl && buttonSecondaryContent;
  const secondaryShowAsLink =
    secondaryShow && !buttonSecondaryUrl.startsWith("http://") && !buttonSecondaryUrl.startsWith("https://");
  const notificationLinkStyles = {
    margin: "16px 12px 0 0",
  };

  return (
    <div>
      <div className="notification-message-text">{content}</div>
      {primaryShow &&
        (primaryShowAsLink ? (
          <span className="notification-message-button-primary">
            <PrimaryButton style={notificationLinkStyles}>
              {buttonPrimaryContent}
            </PrimaryButton>
          </span>
        ) : (
          <span className="notification-message-button-primary">
            <FabricLink href={buttonPrimaryUrl}>{buttonPrimaryContent}</FabricLink>
          </span>
        ))}
      {secondaryShow &&
        (secondaryShowAsLink ? (
          <span className="notification-message-button-secondary">
            <PrimaryButton style={notificationLinkStyles}>
              {buttonSecondaryContent}
            </PrimaryButton>
          </span>
        ) : (
          <span className="notification-message-button-secondary">
            <FabricLink href={buttonSecondaryUrl}>{buttonSecondaryContent}</FabricLink>
          </span>
        ))}
    </div>
  );
}

export interface NotificationProcessingBarProp {
  notifications: ClientNotifications;
}

export function NotificationStatusIcon(props: { status: ClientNotificationStatus }): JSX.Element {
  switch (props.status) {
    case ClientNotificationStatus.Failed:
      return <StatusIcons.Failed />;
    case ClientNotificationStatus.Succeeded:
      return <StatusIcons.Succeeded />;
    case ClientNotificationStatus.PartiallySucceeded:
    case ClientNotificationStatus.Expired:
      return <StatusIcons.Expired />;
    case ClientNotificationStatus.Processing:
    case ClientNotificationStatus.Uploading:
      return <StatusIcons.Processing />;
    case ClientNotificationStatus.Canceled:
      return <StatusIcons.Canceled />;
    case ClientNotificationStatus.Paused:
      return <StatusIcons.Paused />;
    case ClientNotificationStatus.Suspended:
      return <StatusIcons.Suspended />;
  }
}

export function NotificationProcessingBar(props: NotificationProcessingBarProp): JSX.Element {
  const processingItems: ClientNotification[] = values(props.notifications).filter(
    (p) => p.status === ClientNotificationStatus.Processing
  );
  return (
    <div className="notification-progressing-bar">
      {processingItems.length > 0 && (
        // Label and description can fix the Accessibility bug, but it will affect the appearance
        <ProgressIndicator
          styles={{
            itemDescription: {
              display: "none",
            },
            itemName: {
              display: "none",
            },
          }}
          label="Progress"
          description="Notification"
        />
      )}
    </div>
  );
}

export interface NotificationPromptProp {
  notifications: ClientNotifications;
  lastViewedAt?: Date;
}

export function NotificationPrompt(props: NotificationPromptProp): JSX.Element {
  const items: ClientNotification[] = props.lastViewedAt
    ? values(props.notifications).filter((p) => p.updatedAt > props.lastViewedAt && !p.silent)
    : values(props.notifications).filter((p) => !p.silent);
  return (
    items.length > 0 && (
      <div className="notification-prompt">
        <span>{items.length >= 100 ? "99+" : items.length}</span>
      </div>
    )
  );
}

export interface INotificationPanelProps {
  notifications: ClientNotifications;
  isOpen?: boolean | true;
  headerText: string;
  onClick: () => void;
  onClose: () => void;
}

function NotificationPanelInternal(props: INotificationPanelProps): JSX.Element {
  const sortedItems = sortedNotifications(values(props.notifications));
  const { onClose, headerText, isOpen } = props;
  const [isPanelOpen, setIsPanelOpen] = useState(isOpen)
  function onDismiss() {
    setIsPanelOpen(false);
    onClose?.();
  }
  return (
    <Panel
      className="notification-582m3vdw73"
      role="dialog"
      aria-labelledby="Notifications"
      isOpen={isPanelOpen}
      closeButtonAriaLabel={INTL.formatMessage(NotificationLocalizationFormatMessages.PanelClose)}
      onDismiss={onDismiss}
      type={PanelType.custom}
      customWidth={"380px"}
      style={{ top: "40px" }}
      isLightDismiss
      headerText={headerText || ""}
      headerTextProps={{ 'aria-level': 2 }}
    >
      <div>
        <FabricLink
          onClick={props.onClick}
        >{INTL.formatMessage(NotificationLocalizationFormatMessages.DismissAll)}</FabricLink>
      </div>
      <Separator />
      <Stack>
        {sortedItems.map((item) => (
          <Stack.Item key={item.id}>
            <Stack tokens={{ childrenGap: 8 }}>
              <Stack horizontal tokens={{ childrenGap: 5 }} style={{ alignItems: "center" }}>
                <div className="notification-title">
                  <Stack horizontal>
                    <NotificationStatusIcon status={item.status} />
                    {/* Highlight heading property for title in accordance to MAS 2.4.6 */}
                    <Stack className="notification-title-text">
                      {typeof item.title == "function" ? item.title() : item.title}
                    </Stack>
                  </Stack>
                </div>
                <Stack.Item grow={1}>
                  <span />
                </Stack.Item>
                {item.status !== ClientNotificationStatus.Processing && (
                  <div className="close-button">
                    <CloseButton onClick={props.onClick}
                    />
                  </div>
                )}
              </Stack>
              <div className="message-text">
                <div style={{ overflowWrap: "break-word" }}>
                  {typeof item.message == "function" ? item.message() : item.message}
                </div>
              </div>
              <Stack horizontal>
                {item.domain ? getDomainDisplayName(item.domain) : ""}
                <Stack.Item grow={1}>
                  <span />
                </Stack.Item>
                <FormattedRelative
                  // 'whence the current status was pushed to the user'
                  value={item.status === ClientNotificationStatus.Processing ? item.createdAt : item.updatedAt}
                />
              </Stack>
            </Stack>
            <Separator />
          </Stack.Item>
        ))}
      </Stack>
    </Panel>
  );
}

interface NotificationBoxProp {
  notification: ClientNotification;
}

function NotificationBox(props: NotificationBoxProp): JSX.Element {
  const [item, setItem] = useState(props.notification);
  const [visible, setVisible] = useState(!props.notification.silent);
  const [timeoutId, setTimeoutId] = useState(undefined as number);
  const closeButtonWaprredRef = useRef(null as HTMLDivElement);

  useEffect(() => {
    if (item !== props.notification) {
      setItem(props.notification);
    }

    if (!props.notification.silent) {
      window.clearTimeout(timeoutId);
      setVisible(true);
      window.setTimeout(() => {
        const closeBtnInner: HTMLElement = closeButtonWaprredRef.current?.querySelector("button");
        closeBtnInner && closeBtnInner.focus();
      }, 0);
      const newTimeoutId = window.setTimeout(() => {
        setVisible(false);
      }, 10 * 1000);
      setTimeoutId(newTimeoutId);
    }
  }, [props.notification.updatedAt, props.notification.silent]);

  return (
    <div>
      {item && visible && (
        <div className="notification-box-rim6bq6x2v">
          <div className="message-box">
            <div className="notification-title">
              <Stack>
                <Stack horizontal>
                  <NotificationStatusIcon status={item.status} />
                  {/* Highlight heading property for title in accordance to MAS 2.4.6 */}
                  <Stack className="notification-title-text" role="heading" aria-level={2}>
                    {typeof item.title == "function" ? item.title() : item.title}
                  </Stack>
                </Stack>
              </Stack>
              <div className="close-button" ref={closeButtonWaprredRef}>
                <CloseButton onClick={() => setVisible(false)} />
              </div>
            </div>
            <div className="message-text">
              <div style={{ overflowWrap: "break-word" }}>
                {typeof item.message == "function" ? item.message() : item.message}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export interface NotificationBoxListProp {
  notifications: ClientNotifications;
}

export function NotificationBoxListWrapped(props: NotificationBoxListProp): JSX.Element {
  // for the overlay layer, earlier items stay on top so that they may pop away
  // after a given period, recently inserted items push in from the bottom
  const sortedItems: ClientNotification[] = sortBy(
    values(props.notifications),
    (notification) => -notification.createdAt
  );

  return (
    <div className="notification-box-list-7ryh4xl7v9" aria-live="assertive" role="alert">
      {sortedItems.map((item) => {
        return <NotificationBox key={item.id} notification={item} />;
      })}
    </div>
  );
}

export const NotificationPanel = withLocalization(initializeComponent(NotificationPanelInternal));