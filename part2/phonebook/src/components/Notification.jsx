const Notification = ({ message }) => {
    const textStyle = {
        color: 'green',
        background: 'lightgrey'
    }
    if(message.type === 'error') {
        textStyle.color = 'red';
        textStyle.background = 'lightpink';
    }
    return (
        <div className="alert" style={textStyle}>
            {message.text}
        </div>
    )
}

export default Notification