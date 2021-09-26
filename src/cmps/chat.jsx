import React from 'react';
import ChatIcon from '@material-ui/icons/Chat';
import SpeakerNotesOffIcon from '@material-ui/icons/SpeakerNotesOff';
import { socketService, CHAT_MSG_IN, CHAT_MSG_OUT, JOIN_ROOM, TYPING } from '../services/socket.service';

export class Chat extends React.Component {
    state = {
        isOpen: false,
        iconText: <ChatIcon />,
        chatInput: '',
        chat: [],
        typingUserName: null,
    };

    componentDidMount() {
        socketService.setup();
        socketService.emit(JOIN_ROOM, this.props.toyId);
        socketService.on(CHAT_MSG_IN, this.recieveMsg);
        socketService.on(TYPING, this.isTyping);
        this.setState({ chat: this.props.chatLog || [] });
    }

    componentWillUnmount() {
        socketService.off(CHAT_MSG_IN);
        socketService.terminate();
        clearTimeout(this.timer);
        this.props.onClose();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps!==this.props){
            this.setState({chat: this.props.chatLog || []})
        }
    }
    

    style = {
        position: 'fixed',
        bottom: '10px',
        right: '10px',
    };

    iconStyle = {
        borderRadius: '50%',
        cursor: 'pointer',
        backgroundColor: 'yellow',
        border: '2px solid #333',
        height: '3rem',
        width: '3rem',
        textAlign: 'center',
        lineHeight: '3rem',
        verticalAlign: 'middle',
        fontSize: '2rem',
    };

    chatStyle = {
        border: '1px solid #333',
        borderRadius: '3px',
        backgroundColor: 'whitesmoke',
        position: 'fixed',
        bottom: '70px',
        right: '4rem',
        width: '300px',
        height: '400px',
        padding: '15px',
    };

    onOpenChat = () => {
        this.setState({ isOpen: !this.state.isOpen }, () => {
            this.state.isOpen ? this.setState({ iconText: <SpeakerNotesOffIcon /> }) : this.setState({ iconText: <ChatIcon /> });
        });
    };

    handleChange = ({ target }) => {
        this.setState({ [target.name]: target.value }, () => {
            socketService.emit(TYPING, this.props.user?.fullname||'Guest');
        });
    };

    elChat;

    sendMsg = (ev) => {
        ev.preventDefault();
        if (this.state.chatInput.trim().length === 0) return;
        let { chat } = this.state;
        const newMsg = { origin: 'sender', txt: this.state.chatInput, sender: this.props.user?.fullname || 'Guest' };
        chat.push(newMsg);
        clearTimeout(this.timer);
        socketService.emit(TYPING, null);
        socketService.emit(CHAT_MSG_OUT, newMsg);
        this.setState({ chat, chatInput: '' }, () => {
            this.props.onUpdateChat(this.state.chat);
            this.elChat = document.querySelectorAll('.sender');
            this.elChat[this.elChat.length - 1].scrollIntoView({ behavior: 'smooth', block: 'end' });
        });
    };

    recieveMsg = (msg) => {
        let { chat } = this.state;
        chat.push({ origin: 'replier', txt: msg.txt, sender: msg.sender });
        this.setState({ chat }, () => {
            if (this.state.isOpen) {
                this.props.onUpdateChat(this.state.chat);
                this.elChat = document.querySelectorAll('.replier');
                this.elChat[this.elChat.length - 1].scrollIntoView({ behavior: 'smooth', block: 'end' });
            }
        });
    };

    isTyping = (userFullName) => {
        this.setState({ typingUserName: userFullName });
    };

    timer;

    render() {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            this.setState({ typingUserName: null });
        }, 1000);
        return (
            <div className='chat' style={this.style}>
                {
                    <div className='chat-icon' style={this.iconStyle} onClick={this.onOpenChat}>
                        {this.state.iconText}
                    </div>
                }
                {this.state.isOpen && (
                    <div className='chat-content' style={this.chatStyle}>
                        <div className='chat-inner-content' style={{ maxHeight: '350px', overflow: 'auto' }}>
                            {this.state.chat.map((msg, idx) => (
                                <span key={idx} className={msg.origin}>
                                    {msg.origin === 'sender' ? `You (${msg.sender}): ` : `${msg.sender} :`}
                                    {msg.txt}
                                    <br />
                                </span>
                            ))}
                        </div>
                        <form onSubmit={this.sendMsg}>
                            <input
                                value={this.state.chatInput}
                                autoComplete='off'
                                autoFocus
                                name='chatInput'
                                placeholder='Type your message here...'
                                onChange={this.handleChange}
                            />
                            {this.state.typingUserName && <p>{this.state.typingUserName} is typing...</p>}
                        </form>
                    </div>
                )}
            </div>
        );
    }
}
