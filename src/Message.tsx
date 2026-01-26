const Message = ({username, content, avatar, timestamp}:any) =>
{
  return(
    <li>
      <img src={avatar}></img>
      <div>
        <span className='username'>{username} - {timestamp}</span>
        <span className='message'>{content}</span>
      </div>
    </li>
  );
}

export default Message;