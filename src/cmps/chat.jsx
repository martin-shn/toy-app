import React from 'react'
import ChatIcon from '@material-ui/icons/Chat';
import SpeakerNotesOffIcon from '@material-ui/icons/SpeakerNotesOff';

export class Chat extends React.Component{
    state={
        isOpen: false,
        iconText: <ChatIcon/>,
        chatInput: '',
        chat:[]
    }

    style={
        position: 'fixed',
        bottom: '10px',
        right: '10px'
    }

    iconStyle={
        borderRadius:'50%',
        cursor:'pointer',
        backgroundColor:'yellow',
        border: '2px solid #333',
        height:'3rem',
        width:'3rem',
        textAlign:'center',
        lineHeight:'3rem',
        verticalAlign:'middle',
        fontSize: '2rem'
    }

    chatStyle={
        border:'1px solid #333',
        borderRadius:'3px',
        backgroundColor:'whitesmoke',
        position:'fixed',
        bottom:'70px',
        right:'4rem',
        width: '300px',
        height:'400px',
        padding:'15px'
    }

    onOpenChat=()=>{
        this.setState({isOpen:!this.state.isOpen},()=>{
            this.state.isOpen?this.setState({iconText:<SpeakerNotesOffIcon/>}):this.setState({iconText:<ChatIcon/>})
        })
        
    }

    handleChange=({target})=>{
        this.setState({[target.name]: target.value})
    }

    timer;
    elChat;

    sendMsg=(ev)=>{
        ev.preventDefault()
        clearTimeout(this.timer)
        if (this.state.chatInput.trim().length===0) return
        let {chat}=this.state
        chat.push({origin:'sender',txt:this.state.chatInput})
        this.setState({chat,chatInput:'',isWaiting:true},()=>{
            this.elChat = document.querySelectorAll('.sender')
            this.elChat[this.elChat.length-1].scrollIntoView({behavior:'smooth',block:'end'})
        })
        
    }

    recieveMsg=()=>{
        clearTimeout(this.timer)
        let {chat}=this.state
        chat.push({origin:'replier',txt:'Sure thing honey'})
        this.setState({chat,chatInput:'',isWaiting:false},()=>{
            this.elChat = document.querySelectorAll('.replier')
            this.elChat[this.elChat.length-1].scrollIntoView({behavior:'smooth',block:'end'})
        })
    }

    render(){
        clearTimeout(this.timer)
        if (this.state.isWaiting) {
            this.timer = setTimeout(this.recieveMsg,1500)
        }

        return <div className="chat" style={this.style}>
            {<div className="chat-icon" style={this.iconStyle} onClick={this.onOpenChat}>
                {this.state.iconText}
            </div>}
            {this.state.isOpen && <div className="chat-content" style={this.chatStyle}>
                <div className="chat-inner-content" style={{maxHeight:'350px', overflow:'auto'}}>
                    {this.state.chat.map((msg,idx)=><span key={idx} className={msg.origin}>{msg.origin==='sender'?'You: ':'Robot: '}{msg.txt}<br/></span>)}
                </div>
                <form onSubmit={this.sendMsg}>
                    <input
                        value={this.state.chatInput}
                        autoComplete="off"
                        autoFocus
                        name="chatInput"
                        placeholder="Type your message here..."
                        onChange={this.handleChange}
                        style={{position:'absolute',bottom:'10px',width:'calc(100% - 20px)',left:'10px', boxSizing: 'border-box', fontSize:'1.1rem'}}
                        />
                </form>
            </div>}
        </div>
    }
}
