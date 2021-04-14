/* eslint-disable jsx-a11y/click-events-have-key-events,
jsx-a11y/no-noninteractive-element-interactions */
import React, {
  useState, useEffect, createRef, useRef,
} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import Picker from 'emoji-picker-react';
import cx from 'classnames';
import styles from './chat.module.scss';
import smile from '../../images/ic-smiley.svg';
import SendIcon from './sendIcon';
import close from '../../images/close.svg';
import {
  getMessageList, createMessage, deleteMessages, replyMessage,
  prohibitChat, changeNick,
} from '../../store/flow/chat/actions';
import { messageListSelectorById } from '../../store/flow/chat/selector';
import UserAvatar from './userAvatar';
import RepliedMessage from './repliedMessage';
import delIc from '../../images/ic-delete.svg';
import replyIc from '../../images/icon-24-ic-replay.svg';
import { isAdminLoggedInSelector } from '../../store/flow/auth/selector';
import { getEventAdmin, getEvents } from '../../store/flow/events/actions';
import notification, { NOTIFICATION_TYPE__ERROR } from '../notification/notification';
import { currentEventId } from '../../store/flow/events/selector';
import Button, { ButtonStylesEnum } from '../button';

const colorList = ['#10bf6a', '#0091ff', '#fe5b3b', '#ff9a32'];

const getUserColorByNick = (nickname, userColors) => {
  if (nickname) {
    for (let i = 0; i < userColors.length; i += 1) {
      if (userColors[i].nickname === nickname) {
        return userColors[i].color;
      }
    }
  }

  return '#10bf6a';
};

const renderUserColor = (userColors, nickname, isAdmin) => {
  if (isAdmin) {
    return '#10bf6a';
  }
  let userNick = 'A';

  if (nickname && nickname !== null) {
    userNick = nickname;
  }
  for (let i = 0; i < userColors.length; i += 1) {
    if (userColors[i].nickname === userNick) {
      return userColors[i].color;
    }
  }

  let j = userColors.length / colorList.length;
  if (j < 1 && j > 0) {
    j = userColors.length;
  } else if (j >= 1) {
    j = userColors.length - colorList.length * Math.floor(j);
  }
  userColors.push({ nickname, color: colorList[j] });

  return colorList[j];
};

const getRepliedMessageById = (id, messageList, userColors) => {
  const message = messageList.filter((item) => item.id === id);

  if (message.length) {
    const color = getUserColorByNick(message[0].nickname, userColors);
    return { ...message[0], color };
  }
  return null;
};

const Chat = ({
  messageList, eventAdmin, eventsUser, dispatchGetMessageList, dispatchCreateMessage,
  dispatchDeleteMessages, dispatchProhibitChat, isAdminLoggedIn, handleClose,
  dispatchGetEventAdmin, dispatchGetEvents, dispatchChangeNick, nickname,
}) => {
  const userColors = [];
  const eventId = currentEventId();
  const [messageContent, setMessageContent] = useState('');
  const [sendIconColor, setSendIconColor] = useState('#D8D8D8');
  const [isSendButtonDisabled, setSendButtonDisabled] = useState(true);
  const [textareaHeight, setTextareaHeight] = useState('40px');
  const [chatContentMargin, setChatContentMargin] = useState('40px');
  const [textareaLines, setTextareaLines] = useState(1);
  const [emojiOpen, setEmojiOpen] = useState(false);
  const wsUrl = `ws://${process.env.REACT_APP_URL.substring(7)}/ws/event/${eventId}`;
  const textareaRef = createRef();
  const chatContentRef = createRef();
  const lastMessageRef = createRef();
  const eventUser = eventsUser[eventsUser.findIndex((item) => item.id === currentEventId())];
  const allowMessage = eventAdmin.allow_message;
  const inputAreaAvailable = eventUser === undefined ? true : eventUser.allow_message;
  const [selectedMessages, setSelectedMessages] = useState([]);
  const [repliedMessage, setRepliedMessage] = useState(null);
  const [chatProhibitSwitcher, setChatProhibitSwitcher] = useState(!allowMessage);
  const [textAreaDisabler, setTextAreaDisabler] = useState(!inputAreaAvailable);
  const [isEmojiButtonDisabled, setEmojiButtonDisable] = useState(!inputAreaAvailable);
  const [newNickname, setNewNickname] = useState('');

  const onEmojiClick = (event, emojiObject) => {
    if (emojiObject) {
      setMessageContent(`${messageContent}${emojiObject.emoji}`);
      setSendButtonDisabled(false);
      if (textareaRef && textareaRef.current !== null) {
        textareaRef.current.focus();
      }
    }
  };

  const onInputChange = (e) => {
    setMessageContent(e.target.value);
    setSendButtonDisabled(!e.target.value.trim());
  };

  const onMessageSend = () => {
    if (messageContent.length > 200) {
      notification.open(NOTIFICATION_TYPE__ERROR, 'Длина сообщения не должна превышать 200 символов.');
      return;
    }
    if (isAdminLoggedIn && repliedMessage) {
      dispatchCreateMessage(eventId, {
        message: messageContent,
        comment: repliedMessage.id,
      }, isAdminLoggedIn);
    } else {
      dispatchCreateMessage(eventId, { message: messageContent }, isAdminLoggedIn);
      if (!isAdminLoggedIn) {
        dispatchGetEvents();
      }
      if (eventUser && eventUser.allow_message === false) {
        setTextAreaDisabler(true);
        setEmojiButtonDisable(true);
      }
    }
    textareaRef.current.value = '';
    setMessageContent('');
    setSendButtonDisabled(true);
    if (emojiOpen) {
      setEmojiOpen(false);
    }
    setRepliedMessage(null);
    setSelectedMessages([]);
  };

  const onKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (textareaRef.current.value.length > 200) {
        e.preventDefault();
        onMessageSend();
        return;
      }
      if (textareaRef.current.value.trim()) {
        e.preventDefault();
        onMessageSend();
        setTextareaHeight('40px');
      }
      e.preventDefault();
    }
  };

  const onDelete = (e) => {
    e.stopPropagation();
    for (let i = 0; i < selectedMessages.length; i += 1) {
      dispatchDeleteMessages(selectedMessages[i].id);
    }
    setSelectedMessages([]);
  };

  const onReply = (e, message) => {
    e.stopPropagation();
    setRepliedMessage(message);
    setSelectedMessages([]);
  };

  const onSelectMessage = (item) => {
    if (!selectedMessages.includes(item)) {
      setSelectedMessages([...selectedMessages, item]);
    } else {
      const tmp = selectedMessages.slice();
      tmp.splice(selectedMessages.indexOf(item), 1);
      setSelectedMessages(tmp);
    }
  };

  const onProhibitChat = () => {
    setChatProhibitSwitcher(!chatProhibitSwitcher);
    dispatchProhibitChat(eventId, {
      ...eventAdmin,
      allow_message: chatProhibitSwitcher,
    });
    dispatchGetEventAdmin(eventId);
  };

  const onTextType = (e) => {
    const { scrollHeight } = textareaRef.current;
    const lines = Math.ceil((scrollHeight - 18) / 22);

    if (lines !== textareaLines) {
      setTextareaLines(lines);
      let height = lines * 22 + 18;
      if (height > 150) {
        height = 150;
      }
      setTextareaHeight(`${height}px`);
      const margin = `${height + 41}px`;
      setChatContentMargin(margin);
    }

    if (e.key === 'Backspace') {
      setTextareaHeight(scrollHeight >= 150 ? '150px' : `${lines * 22 + 18}px`);
    }

    if (textareaRef.current.value.length === 0) {
      setTextareaHeight('40px');
    }
  };

  useEffect(() => {
    dispatchGetMessageList(eventId, isAdminLoggedIn);
  }, []);

  useEffect(() => {
    const ws = new WebSocket(wsUrl);
    ws.onmessage = (e) => {
      const eParsed = JSON.parse(e.data);
      if (eParsed.command === 'event_update_chat') {
        dispatchGetMessageList(eventId, isAdminLoggedIn);
      }
    };
    return () => ws.close();
  }, []);

  useEffect(() => {
    if (!isAdminLoggedIn) {
      dispatchGetEvents();
    }
  }, []);

  useEffect(() => {
    if (chatContentRef && chatContentRef.current) {
      const scrollEvent = (event) => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
      };
      chatContentRef.current.addEventListener('DOMNodeInserted', scrollEvent);
    }
    if (lastMessageRef && lastMessageRef.current !== null) {
      lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [nickname]);

  const useOutsideAlerter = (ref) => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        handleClose();
      }
    };

    useEffect(() => {
      // Bind the event listener
      document.addEventListener('click', handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener('click', handleClickOutside);
      };
    });
  };
  const chatRef = useRef(null);
  useOutsideAlerter(chatRef);

  useEffect(() => {
    if (isAdminLoggedIn) {
      dispatchGetEventAdmin(eventId);
    }
  }, [chatProhibitSwitcher]);

  useEffect(() => {
    if (eventUser && eventUser.allow_message !== undefined) {
      dispatchGetEvents();
    }
    return () => {
      if (eventUser && eventUser.allow_message !== undefined) {
        dispatchGetEvents();
      }
    };
  }, []);

  useEffect(() => {
    if (eventUser && eventUser.allow_message === true) {
      setTextAreaDisabler(false);
      setEmojiButtonDisable(false);
    }
    if (eventUser && eventUser.allow_message === false) {
      setTextAreaDisabler(true);
      setEmojiButtonDisable(true);
    }
  }, [eventUser]);

  const handleNickname = () => {
    dispatchChangeNick({
      nickname: newNickname,
    });
    setNewNickname('');
    dispatchGetMessageList(eventId, isAdminLoggedIn);
  };

  const onNicknameChange = (e) => {
    setNewNickname(e.target.value);
  };

  const changeNickname = () => {
    localStorage.setItem('nickname', '');
    dispatchGetMessageList(eventId, isAdminLoggedIn);
  };

  const sendNickOnEnter = (e) => {
    if (e.key === 'Enter') {
      if (newNickname.length === 0) {
        e.preventDefault();
        return;
      }
      if (newNickname.length > 40) {
        e.preventDefault();
        return;
      }
      e.preventDefault();
      handleNickname();
    }
  };

  return (
    <div className={styles.wrapper} ref={chatRef}>
      <div className={styles.chatWrapper}>
        {eventUser && (nickname === null || nickname === '') ? (
          <div className={styles.changeNickWrapper}>
            <div className={styles.changeNickTop}>
              {nickname === null ? <p>Чтобы войти в чат, необходимо указать никнейм</p>
                : <p className={styles.changeNickInscription}>Изменить никнейм</p>}
              <div className={styles.closeForMobileContainer}>
                <button
                  type="button"
                  className={styles.closeForMobileButton}
                  onClick={handleClose}
                >
                  {' '}
                  <img src={close} />
                </button>
              </div>
            </div>
            <div className={styles.changeNickMiddle}>
              <textarea
                // eslint-disable-next-line jsx-a11y/no-autofocus
                autoFocus
                className={cx({
                  [styles.nickInputForm]: true,
                  [styles.nickInputError]: newNickname && newNickname.length > 40,
                })}
                placeholder="Введите никнейм"
                value={newNickname}
                onChange={onNicknameChange}
                onKeyPress={sendNickOnEnter}
                wrap="off"
              />
            </div>
            <div className={styles.changeNickBottom}>
              <Button
                label={nickname === null ? 'Войти в чат' : 'Сохранить'}
                buttonStyles={[ButtonStylesEnum.SUCCESS]}
                callback={handleNickname}
                buttonExtClasses={{ [styles.add]: true }}
                isDisabled={false}
              />
            </div>
          </div>
        ) : (
          <div className={styles.chatContainer}>
            {isAdminLoggedIn ? (
              <div className={styles.chatHeader}>
                <div className={cx({
                  [styles.leftSideHeader]: selectedMessages.length > 0,
                  [styles.hidden]: selectedMessages.length === 0,
                })}
                >
                  <button
                    type="button"
                    className={styles.resetSelectedMessages}
                    onClick={() => setSelectedMessages([])}
                    aria-label="ESLintCrutch"
                  />
                  <div className={styles.selectedMessagesCounter}>
                    {selectedMessages.length}
                  </div>
                </div>
                <div className={styles.centralSideHeader}>
                  <input
                    type="checkbox"
                    onChange={onProhibitChat}
                    className={styles.prohibitChat}
                    checked={chatProhibitSwitcher}
                  />
                  <span className={styles.chatHeaderText}>Запретить переписку</span>
                </div>
                <div className={styles.rightSideHeader}>
                  {isAdminLoggedIn && selectedMessages.length === 1 && (
                  <img src={replyIc} onClick={(event) => onReply(event, selectedMessages[0])} />
                  )}
                  {isAdminLoggedIn && selectedMessages.length > 0 && (
                  <img src={delIc} onClick={onDelete} />
                  )}
                </div>
              </div>
            ) : (
              <div className={styles.chatHeader}>
                <div>
                  <p className={styles.headerName}>Чат</p>
                </div>
                <div>
                  <button type="button" className={styles.changeNickButton} onClick={changeNickname}>сменить никнейм</button>
                </div>
                <div className={styles.closeForMobileContainer}>
                  <button
                    type="button"
                    className={styles.closeForMobileButton}
                    onClick={handleClose}
                  >
                    {' '}
                    <img src={close} />
                  </button>
                </div>
              </div>
            )}
            <div className={styles.messagesAndInputWrapper}>
              <div
                className={cx({
                  [styles.chatContent]: true,
                  [styles.chatContent_user]: !isAdminLoggedIn,
                })}
                ref={chatContentRef}
              >
                {messageList && messageList.length > 0 && messageList.map((item, index) => (
                  <div key={item.id} className={styles.messageWrapper}>
                    {isAdminLoggedIn && (
                      <div className={cx({
                        [styles.selector]: true,
                        [styles.selector_admin]: item.is_admin_message,
                        [styles.selector_replied]: item.is_admin_message && item.comment,
                      })}
                      >
                        <input
                          type="checkbox"
                          onChange={() => onSelectMessage(item)}
                          className={styles.selectedMessage}
                          checked={selectedMessages.includes(item)}
                        />
                      </div>
                    )}
                    <div
                      key={item.id}
                      className={cx({
                        [styles.chatItem_replied]: item.comment,
                        [styles.chatItem]: !item.comment,
                        [styles.chatItem_admin]: item.is_admin_message,
                      })}
                      ref={index === messageList.length - 1 ? lastMessageRef : null}
                    >
                      {item.comment && (
                        <RepliedMessage
                          message={getRepliedMessageById(item.comment, messageList, userColors)}
                        />
                      )}
                      <div className={styles.userDataContainer}>
                        <UserAvatar
                          color={renderUserColor(userColors, item.nickname, item.is_admin_message)}
                          nickname={item.nickname}
                          isAdmin={item.is_admin_message}
                        />
                        {/* <span className={styles.userName}>{item.is_admin_message
                        ? 'Администратор' : item.nickname}</span> */}
                        <span className={styles.userName}>{item.is_admin_message ? 'Администратор' : item.nickname}</span>
                        <div className={styles.messageSendTime}>{moment.utc(item.time, 'YYYY-MM-DD HH:mm').local().format('HH:mm')}</div>
                      </div>
                      <div className={cx({
                        [styles.chatMessageContainer]: !item.is_admin_message,
                        [styles.chatMessageContainer_admin]: item.is_admin_message,
                        [styles.chatMessageContainer_user]:
                      !item.is_admin_message && !isAdminLoggedIn,
                      })}
                      >
                        {item.message}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {emojiOpen && (
                <div className={styles.emojiContainer} style={{ bottom: chatContentMargin }}>
                  <Picker onEmojiClick={onEmojiClick} />
                </div>
              )}
              <div className={styles.chatFooter}>
                <div className={cx({
                  [styles.replyInsideInput]: repliedMessage,
                  [styles.replyInsideInput_withMessage]: !repliedMessage,
                })}
                >
                  <div className={cx({ [styles.wrapperReplyMessage]: repliedMessage })}>
                    { repliedMessage && repliedMessage.length !== 0 && (
                      <RepliedMessage
                        message={getRepliedMessageById(repliedMessage.id, messageList, userColors)}
                        closeable={(e) => {
                          e.stopPropagation();
                          setRepliedMessage(null);
                        }}
                      />
                    )}
                  </div>
                  <div className={cx({
                    [styles.textareaContainer]: messageContent.length <= 200,
                    [styles.textareaContainer_overflow]: messageContent.length > 200,
                  })}
                  >
                    <textarea
                    // eslint-disable-next-line jsx-a11y/no-autofocus
                      autoFocus
                      type="text"
                      rows="1"
                      placeholder={isAdminLoggedIn ? 'Введите сообщение от администратора' : 'Введите текст сообщения'}
                      value={messageContent}
                      className={styles.textareaStyle}
                      onChange={onInputChange}
                      onKeyPress={onKeyPress}
                      onKeyUp={onTextType}
                      ref={textareaRef}
                      style={{ height: textareaHeight }}
                      disabled={textAreaDisabler}
                    />
                    <button
                      type="button"
                      className={styles.buttonWithIcon}
                      onClick={() => setEmojiOpen(!emojiOpen)}
                      disabled={isEmojiButtonDisabled}
                    >
                      {' '}
                      <img src={smile} />
                    </button>
                    <button
                      type="button"
                      className={styles.buttonWithIcon_end}
                      onClick={onMessageSend}
                      onMouseEnter={() => setSendIconColor('#10bf6a')}
                      onMouseLeave={() => setSendIconColor('#D8D8D8')}
                      disabled={isSendButtonDisabled}
                    >
                      {' '}
                      <SendIcon color={sendIconColor} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

Chat.defaultProps = {
  eventAdmin: {},
  eventsUser: [],
  nickname: '',
};

Chat.propTypes = {
  isAdminLoggedIn: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  dispatchGetMessageList: PropTypes.func.isRequired,
  dispatchCreateMessage: PropTypes.func.isRequired,
  dispatchDeleteMessages: PropTypes.func.isRequired,
  dispatchProhibitChat: PropTypes.func.isRequired,
  messageList: PropTypes.instanceOf(Object).isRequired,
  eventAdmin: PropTypes.instanceOf(Object),
  eventsUser: PropTypes.instanceOf(Array),
  dispatchGetEventAdmin: PropTypes.func.isRequired,
  dispatchGetEvents: PropTypes.func.isRequired,
  dispatchChangeNick: PropTypes.func.isRequired,
  nickname: PropTypes.string,
};

const mapDispatchToProps = {
  dispatchGetMessageList: getMessageList,
  dispatchCreateMessage: createMessage,
  dispatchDeleteMessages: deleteMessages,
  dispatchReplyMessage: replyMessage,
  dispatchProhibitChat: prohibitChat,
  dispatchGetEventAdmin: getEventAdmin,
  dispatchGetEvents: getEvents,
  dispatchChangeNick: changeNick,
};

const mapStateToProps = (state) => ({
  messageList: messageListSelectorById(state),
  isAdminLoggedIn: isAdminLoggedInSelector(state),
  eventAdmin: state.events.eventAdmin,
  eventsUser: state.events.data,
  nickname: localStorage.getItem('nickname'),
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
